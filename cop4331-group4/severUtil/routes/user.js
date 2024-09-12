const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");
const { User, Table } = require("../mongooseSchemas/schemas.js");
const {
  registrationValidationSchema,
  loginValidationSchema,
} = require("../util/validationSchemas.js");
const {
  hashPassword,
  comparePassword,
} = require("../util/passwordEncryption.js");
const verifyToken = require("../util/tokenVerification.js");
const generateVerificationCode = require("../util/generateCode.js");
var nodeoutlook = require("../util/sendMail.js");

const router = Router();

// Registration
router.post(
  "/api/register",
  checkSchema(registrationValidationSchema),
  async (request, response) => {
    let result = validationResult(request);

    if (!result.isEmpty()) return response.status(400).send(result.array());

    let data = matchedData(request);
    data.password = hashPassword(data.password);
    data.verified = false;
    let newUser = new User(data);

    try {
      let savedUser = await newUser.save();

      let verificationCode = generateVerificationCode();

      nodeoutlook.sendEmail({
        auth: {
          user: "brah0211@outlook.com",
          pass: "Asere#2008",
        },
        from: "brah0211@outlook.com",
        to: data.email,
        subject: "All Knights Study - Email Verification",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 400px;
              margin: 20px auto;
              background-color: #fff;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .verification-code {
              font-size: 18px;
              padding: 10px 15px;
              background-color: #f0f0f0;
              border-radius: 4px;
              margin-bottom: 20px;
            }
            .footer {
              font-size: 14px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Email Verification</h2>
            <p>Please use the following verification code to verify your email address:</p>
            <div class="verification-code">${verificationCode}</div>
            <p>If you did not request this verification, you can ignore this email.</p>
            <p class="footer">This email was sent by All Knights Study</p>
          </div>
        </body>
        </html>`,
        // onError: (e) => console.log(e),
        // onSuccess: (i) => console.log(i),
      });

      const token = jwt.sign(
        {
          userId: savedUser._id,
          username: savedUser.username,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          verificationCode: verificationCode,
        },
        "Group Finder"
      );

      return response.send({
        token,
        msg: "User registered. Verification email sent.",
      });
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyValue) {
        return response
          .status(400)
          .send({ error: "Username/email already exist" });
      } else {
        return response.status(400).send({ error: err.message });
      }
    }
  }
);

// Login
router.post(
  "/api/login",
  checkSchema(loginValidationSchema),
  async (request, response) => {
    let result = validationResult(request);

    if (!result.isEmpty) return response.status(400).send(result.array());

    let { body } = request;
    let error = "";

    try {
      let foundUser = await User.findOne({ username: body.username });

      if (!foundUser)
        return response.status(400).send({ error: "User not found" });

      const passwordMatch = comparePassword(body.password, foundUser.password);
      if (!passwordMatch)
        return response.status(401).send({ error: "Incorrect password" });

      // Check if email is verified
      // if (!foundUser.verified)
      //   return response.status(400).json({ error: "Email not verified" });

      const token = jwt.sign(
        {
          userId: foundUser._id,
          username: foundUser.username,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
        },
        "Group Finder"
      );

      return response.status(200).send({ token });
    } catch (err) {
      return response.status(400).send({ error: err.toString() });
    }
  }
);

// Forgot password
router.post("/api/forgot-password", async (request, response) => {
  let { body } = request;

  try {
    let foundUser = await User.findOne({ username: body.username });

    if (!foundUser)
      return response.status(400).send({ error: "User not found" });

    let verificationCode = generateVerificationCode();

    nodeoutlook.sendEmail({
      auth: {
        user: "brah0211@outlook.com",
        pass: "Asere#2008",
      },
      from: "brah0211@outlook.com",
      to: foundUser.email,
      subject: "All Knights Study - User Verification",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 400px;
            margin: 20px auto;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .verification-code {
            font-size: 18px;
            padding: 10px 15px;
            background-color: #f0f0f0;
            border-radius: 4px;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 14px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>User Verification</h2>
          <p>Please use the following verification code to verify your identity:</p>
          <div class="verification-code">${verificationCode}</div>
          <p>If you did not request this verification, you can ignore this email.</p>
          <p class="footer">This email was sent by All Knights Study</p>
        </div>
      </body>
      </html>`,
      // onError: (e) => console.log(e),
      // onSuccess: (i) => console.log(i),
    });

    return response.status(200).send({
      msg: "Email successfully sent",
      verificationCode: verificationCode,
    });
  } catch (err) {
    console.log(err.toString());
    return response.status(400).send({ error: err.toString() });
  }
});

router.post("/api/change-password", async (request, response) => {
  let { body } = request;
  let username = body.username;

  try {
    let foundUser = await User.findOne({ username: username });

    if (!foundUser) {
      return response.status(404).json({ error: "User not found" });
    }

    let newPassword = body.password;

    if (newPassword.length < 5) {
      return response.status(400).send({
        error: "Password must be at least 5 characters long",
      });
    }

    let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (!specialCharacters.test(newPassword)) {
      return response.status(400).send({
        error: "Password must contain at least one special character",
      });
    }

    const hashedPassword = hashPassword(newPassword);
    foundUser.password = hashedPassword;

    await foundUser.save();

    return response.status(200).send({ msg: "Password changed successfully" });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return response.status(500).send({ error: "Internal server error" });
  }
});

// Find an specific user
router.post("/api/find-user", async (request, response) => {
  let { body } = request;
  let userId = body.userId;

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return response.status(404).send({ error: "User not found" });
    }

    const { firstName, lastName, username } = foundUser;

    return response.status(200).send({ firstName, lastName, username });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return response.status(500).send({ error: "Internal server error" });
  }
});

// Update user
router.patch("/api/user-edit", verifyToken, async (request, response) => {
  let { body } = request;
  let userId = request.userId;

  try {
    let foundUser = await User.findById(userId);

    if (!foundUser)
      return response.status(404).send({ error: "User not found" });

    if (body.firstName) {
      foundUser.firstName = body.firstName;
    }
    if (body.lastName) {
      foundUser.lastName = body.lastName;
    }
    if (body.email) {
      foundUser.email = body.email;
    }
    if (body.password) {
      let newPassword = body.password;

      if (newPassword.length < 5) {
        return response.status(400).send({
          error: "Password must be at least 5 characters long",
        });
      }

      let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      if (!specialCharacters.test(newPassword)) {
        return response.status(400).send({
          error: "Password must contain at least one special character",
        });
      }

      const hashedPassword = hashPassword(newPassword);
      foundUser.password = hashedPassword;
    }

    await foundUser.save();

    return response
      .status(200)
      .send({ ...foundUser.toObject(), message: "User updated successfully" });
  } catch (err) {
    return response.status(500).send({ error: err.message });
  }
});

// Add user to table
router.patch(
  "/api/add-user-to-table",
  verifyToken,
  async (request, response) => {
    let { body } = request;
    let userId = request.userId;

    try {
      let foundTable = await Table.findOne({ tableNum: body.tableNum });

      if (!foundTable)
        return response.status(400).send({ error: "Table not found" });

      let foundUser = await User.findById(userId);

      if (!foundUser)
        return response.status(400).send({ error: "User not found" });

      if (foundTable.usersAtTable.includes(foundUser._id))
        return response.status(400).send({
          error: "User already in table",
        });

      foundTable.usersAtTable.push(foundUser._id);

      if (body.currCapacity !== undefined) {
        foundTable.currCapacity = body.currCapacity;
      }

      if (foundTable.currCapacity > foundTable.maxCapacity)
        return response.status(400).send({
          ...foundTable.toObject(),
          message: "Table is already full",
        });

      await foundTable.save();

      return response.status(200).send({
        ...foundTable.toObject(),
        message: "User successfully added to table successfully",
      });
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }
);

// Remove user from table
router.patch(
  "/api/remove-user-from-table",
  verifyToken,
  async (request, response) => {
    let { body } = request;
    let userId = request.userId;

    try {
      let foundTable = await Table.findOne({ tableNum: body.tableNum });

      if (!foundTable)
        return response.status(400).send({
          error: "Table not found",
        });

      let foundUser = await User.findById(userId);

      if (!foundUser)
        return response.status(400).send({
          error: "User not found",
        });

      if (!foundTable.usersAtTable.includes(foundUser._id))
        return response.status(400).send({
          error: "User not in table",
        });

      foundTable.usersAtTable = foundTable.usersAtTable.filter(
        (tableUserId) => tableUserId.toString() !== userId.toString()
      );

      if (body.currCapacity !== undefined) {
        foundTable.currCapacity = body.currCapacity;
      }

      await foundTable.save();

      return response.status(200).send({
        ...foundTable.toObject(),
        message: "User successfully removed to table successfully",
      });
    } catch (err) {
      return response.status(500).send({ error: err.message });
    }
  }
);

// Returns all users in database
router.get("/api/all-users", async (request, response) => {
  try {
    const users = await User.find();

    return response.status(200).json(users);
  } catch (err) {
    return response.status(500).json({ error: "Internal server error" });
  }
});

// Delete user endpoint
router.delete("/api/delete-user", async (request, response) => {
  let { body } = request;
  let userId = body.userId;

  try {
    // Find user by username
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return response.status(404).json({ error: "User not found" });
    }

    // Delete user
    await foundUser.deleteOne();

    return response.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
