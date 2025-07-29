const mongoose = require("mongoose");

const installmentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    paid: {
        type: Boolean,
        default: false,
    },
});

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    topics: {
        type: [String],
        default: [],
    },
    selectedTopics: {
        type: [String],
        default: [],
    },
});

const studentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        contact: { type: String, required: true },
        password: { type: String, required: true },
        plainPassword: { type: String },
        address: { type: String },
        aadhaarFile: { type: String },
        mode: {
            type: String,
            enum: ["PureOnline", "OnlineClass", "Offline"],
            default: "PureOnline",
        },
        doj: { type: Date, required: true },
        duration: { type: String, required: true },
        totalFees: { type: Number, required: true },
        installments: [installmentSchema],
        courses: [courseSchema],
        courseCompleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
