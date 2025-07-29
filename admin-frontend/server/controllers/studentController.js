const Student = require("../model/Student");
const bcrypt = require("bcryptjs");

// Register Student
exports.registerStudent = async (req, res) => {
    try {
        const {
            name,
            email,
            contact,
            password,
            address,
            mode,
            doj,
            duration,
            totalFees,
        } = req.body;

        const installments = JSON.parse(req.body.installments || "[]");
        const courses = JSON.parse(req.body.courses || "[]");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            name,
            email,
            contact,
            password: hashedPassword,
            plainPassword: password,
            address,
            mode,
            doj,
            duration,
            totalFees,
            installments,
            courses,
            aadhaarFile: req.file ? req.file.filename : null,
            isAdmin: false
        });

        await newStudent.save();
        res.status(201).json({ message: "Student registered successfully!" });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
};

// Get All Students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });

        if (student.aadhaarFile) {
            fs.unlink(`uploads/${student.aadhaarFile}`, () => { });
        }

        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { password, ...rest } = req.body;

        let updatedFields = { ...rest };

        if (password) {
            const hash = await bcrypt.hash(password, 10);
            updatedFields.password = hash;
            updatedFields.plainPassword = password;
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true }
        );

        res.json(updatedStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};
