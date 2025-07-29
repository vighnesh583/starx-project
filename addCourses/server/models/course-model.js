const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    courseTopics: [
        {
            topicId: {
                type: String,
                required: true,
            },
            topicName: {
                type: String,
                required: true,
            },
            videoUrl: {
                type: String,
                required: false, // optional
            },
            assignmentFile: {
                type: String, // URL or file path
                required: false,
            },
            quizzes: [
                {
                    question: {
                        type: String,
                        required: true,
                    },
                    options: [
                        {
                            type: String,
                            required: true,
                        }
                    ],
                    correctAnswer: {
                        type: String,
                        required: true,
                    }
                }
            ]
        }
    ]
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
