const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User, Table } = require("../mongooseSchemas/schemas.js");
const verifyToken = require("../util/tokenVerification.js");

const router = Router();

// Email verification endpoint
router.post("/api/verify-email", verifyToken, async (request, response) => {
  let userId = request.userId;
  try {
    const foundUser = await User.findById(userId);

    if (!foundUser)
      return response.status(404).json({ error: "User not found" });

    // Update user's verified status
    foundUser.verified = true;
    await foundUser.save();

    return response.status(200).send({ msg: "user verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
});

// Check email verification status endpoint
router.post(
  "/api/email-verification-status",
  verifyToken,
  async (request, response) => {
    let userId = request.userId;
    try {
      const foundUser = await User.findById(userId);

      if (!foundUser)
        return response.status(404).json({ error: "User not found" });

      return response.status(200).json({ verified: foundUser.verified });
    } catch (error) {
      console.error("Error checking verification status:", error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
