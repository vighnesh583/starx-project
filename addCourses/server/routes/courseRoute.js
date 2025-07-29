const express = require("express");
const router = express.Router();


const courseController = require("../controllers/courseController");


router.route("/addCourses").post(courseController.addCourses);


module.exports = router;