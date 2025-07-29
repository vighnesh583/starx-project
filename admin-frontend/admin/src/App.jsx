import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddVideo from "./pages/AddVideo";
import AddQuiz from "./pages/AddQuiz";
import AddAssignment from "./pages/AddAssignment";
import ManageCourses from "./pages/ManageCourses";
import StudentManager from "./pages/StudentManager";
import StudentProgress from "./pages/StudentProgress";
import StudentRegister from "./components/StudentRegister";
import StudentUpdate from "./pages/StudentUpdate";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-video" element={<AddVideo />} />
      <Route path="/add-quiz" element={<AddQuiz />} />
      <Route path="/add-assignment" element={<AddAssignment />} />
      <Route path="/manage-courses" element={<ManageCourses />} />
      <Route path="/students" element={<StudentManager />} />
      <Route path="/progress" element={<StudentProgress />} />
      <Route path="/studentregister" element={<StudentRegister />} />
      <Route path="/studentupdate/:id" element={<StudentUpdate />} />

    </Routes>
  </BrowserRouter>
);

export default App;
