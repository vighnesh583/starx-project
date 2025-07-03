const express = require("express");
const { adminRegister, login } = require("../controllers/authController");

const router = express.Router();

router.post("/isrefadminreg", adminRegister);  // Admin-only registration via URL
router.post("/login", login);                  // Shared login for both

module.exports = router;
