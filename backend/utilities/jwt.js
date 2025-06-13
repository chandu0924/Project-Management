import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ssksdjgomg99nw3e";

// Generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

// Verify token
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
