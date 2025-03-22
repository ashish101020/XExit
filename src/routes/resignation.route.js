// const express = require('express');
// const { submitResignation, submitExitResponse, resignationData } = require('../controllers/user.controller');
// const authenticateToken = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/resign', authenticateToken,  submitResignation);
// router.get('/resign', authenticateToken,  resignationData);
// router.post('/responses', authenticateToken,  submitExitResponse);

// module.exports = router;



const { authenticate, authorizeRole } = require("../middlewares/auth.js");
const {submitResignation} = require("../controllers/resignation.controller.js");
const {exitResponse} = require("../controllers/exitResponse.controller.js")
const express = require("express");
const Router = express.Router();


Router.post("/resign", authenticate, submitResignation);

Router.post("/responses", authenticate, exitResponse);
module.exports = Router;