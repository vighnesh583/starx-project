// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Placements from './pages/Placements';
import About from './pages/About';
import Contact from './pages/Contact';
import LessonPage from './pages/LessonPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DownloadPDF from './components/DownloadPDF';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/placements" element={<Placements />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/learn"
        element={
          <PrivateRoute>
            <LessonPage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/download" element={<DownloadPDF />} />


    </Routes>
  );
}

export default App;
