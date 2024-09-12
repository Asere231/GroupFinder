const crypto = require("crypto");

// Generates a 8-character hexadecimal string
const generateVerificationCode = () => {
  let code = crypto.randomBytes(4).toString("hex").toUpperCase();
  return code;
};

module.exports = generateVerificationCode;
