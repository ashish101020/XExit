// const express = require('express');
// const { register, login, getUserProfile } = require('../controllers/auth.controller');
// const authenticateToken  = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.get("/me", authenticateToken, getUserProfile);

// module.exports = router;


const express = require("express");
const authController = require("../controllers/auth.controller");
const Router = express.Router();

Router.post("/login",authController.login);
Router.post("/register",authController.register);


module.exports = Router;