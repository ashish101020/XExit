require("dotenv").config();

const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    console.log("Authenticating request...");

    const token = req.headers["authorization"]?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(403).json({ error: "Access denied. No token provided." });
    }
    console.log(token);
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

const authorizeRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: "Access denied. Insufficient permissions." });
        }
        next();
    };
};

module.exports = { authenticate, authorizeRole };
