const { Router } = require("express");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");
const { User, Table } = require("../mongooseSchemas/schemas.js");
const { createTableValidationSchema } = require("../util/validationSchemas.js");

const router = Router();

// Create tables
router.post(
  "/api/tables",
  checkSchema(createTableValidationSchema),
  async (request, response) => {
    let result = validationResult(request);

    if (!result.isEmpty()) return response.status(400).send(result.array());

    let data = matchedData(request);

    let table = new Table(data);
    // table.usersAtTable.push(userId);

    try {
      console.log(data);
      let foundUser = await User.findById(data.userId);

      if (!foundUser)
        return response.status(404).send({ error: "User not found" });

      table.usersAtTable.push(foundUser._id);
      await table.save();

      return response.status(200).send({
        ...table.toObject(),
        msg: "table successfully created with user",
      });
    } catch (err) {
      if (err.code === 11000 && err.keyPattern && err.keyValue) {
        return response.status(400).send({ error: "Table already exist" });
      } else {
        return response.status(400).send({ error: err.message });
      }
    }
  }
);

// Update table
router.patch("/api/table-edit", async (request, response) => {
  let { body } = request;

  try {
    let foundTable = await Table.findOne({ tableNum: body.tableNum });

    if (!foundTable)
      return response.status(404).send({ error: "Table not found" });

    if (body.title) {
      foundTable.title = body.title;
    }
    if (body.subject) {
      foundTable.subject = body.subject;
    }
    if (body.currCapacity) {
      foundTable.currCapacity = body.currCapacity;
    }
    if (body.maxCapacity) {
      foundTable.maxCapacity = body.maxCapacity;
    }

    if (foundTable.currCapacity > foundTable.maxCapacity)
      return response.status(400).send({
        ...foundTable.toObject(),
        message: "Table is already full",
      });

    await foundTable.save();

    return response.status(200).send({
      ...foundTable.toObject(),
      message: "Table updated successfully",
    });
  } catch (err) {
    return response.status(500).send({ error: err.message });
  }
});

// Delete table
router.delete("/api/delete-table", async (request, response) => {
  let { body } = request;

  try {
    let foundTable = await Table.findOne({ tableNum: body.tableNum });

    if (!foundTable)
      return response.status(404).send({ error: "Table not found" });

    await foundTable.deleteOne();

    return response.status(200).send({
      message: "Table deleted successfully",
    });
  } catch (err) {
    return response.status(500).send({ error: err.message });
  }
});

// Returns all tables from database
router.get("/api/all-tables", async (request, response) => {
  try {
    const tables = await Table.find();

    return response.status(200).json(tables);
  } catch (err) {
    return response.status(500).json({ error: "Internal server error" });
  }
});

// Find table
router.post("/api/find-table", async (request, response) => {
  try {
    let { body } = request;
    let foundTable = await Table.findOne({ tableNum: body.tableNum });

    if (!foundTable)
      return response.status(404).send({ error: "Table not found" });

    return response.status(200).send(foundTable);
  } catch (err) {
    return response.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
