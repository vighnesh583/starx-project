// require user model here to get all userdata
const Course = require("../models/course-model");
const bcrypt = require("bcryptjs");

const addCourses = async (req, res) => {
    try {
        const { courseId, courseName, courseTopics } = req.body;

        const newCourse = new Course({ courseId, courseName, courseTopics });
        // await newCourse.save();

        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



module.exports = { addCourses };