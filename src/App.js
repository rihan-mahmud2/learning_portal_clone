import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CoursePlayer from "./pages/students/CoursePlayer";
import LeaderBoard from "./pages/students/leaderBoard";
function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/video" element={<CoursePlayer />} />
        <Route path="/leader" element={<LeaderBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
