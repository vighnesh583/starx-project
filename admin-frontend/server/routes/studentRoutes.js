const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
    registerStudent,
    getAllStudents,
    deleteStudent,
    updateStudent,
    getStudentById,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/register", upload.single("aadhaarFile"), registerStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);
router.put("/:id", updateStudent);

module.exports = router;
