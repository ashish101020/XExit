const express = require("express");
const { authenticate, authorizeRole } = require("../middlewares/auth");
const { getAllResignations } = require("../controllers/resignation.controller");
const { concludeResignation, getAllExitresponses, initialiseAdminAccount } = require("../controllers/admin.controller");

const router = express.Router();

// Only Admins can access resignation and conclusion endpoints
router.get("/resignations", authenticate, authorizeRole("HR"), getAllResignations);
router.put("/conclude_resignation", authenticate, authorizeRole("HR"), concludeResignation);

// Both Admins and Employees can view exit responses
router.get("/exit_responses", authenticate, getAllExitresponses);

module.exports = router;
