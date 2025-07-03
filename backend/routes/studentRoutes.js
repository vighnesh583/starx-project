const express = require("express");
const { registerStudent } = require("../controllers/studentController");

const router = express.Router();

router.post("/studentregister", registerStudent);  // Only accessed by admin in frontend

module.exports = router;
