const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token after "Bearer"

  if (!token) {
    return res.status(403).json({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    // Fetch user based on decoded ID
    req.user = await User.findByPk(decoded.id);
    
    if (!req.user) {
      return res.status(404).json({ message: "User not found!" });
    }
    
    next();
  });
};

module.exports = authenticate;
