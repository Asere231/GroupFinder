const jwt = require("jsonwebtoken");

function verifyToken(request, response, next) {
  const token = request.header("Authorization");

  if (!token)
    return response.status(401).json({ error: "Access denied: Token missing" });

  try {
    const decoded = jwt.verify(token, "Group Finder");
    request.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return response.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
