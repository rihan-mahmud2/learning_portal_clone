import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CoursePlayer from "./pages/students/CoursePlayer";
import LeaderBoard from "./pages/students/leaderBoard";
import AdminLogin from "./pages/login/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Assignment from "./pages/admin/Assignment";
import AssignmentMark from "./pages/admin/AssignmentMark";
import Video from "./pages/admin/Video";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminQuize from "./pages/admin/AdminQuize";
import { useAuthChecked } from "./hooks/useAuthChecked";
import StudentPrivateRoute from "./components/StudentPrivateRoute";
import AddVideo from "./components/admin/AddVideo";
import EditVideo from "./components/admin/EditVideo";
import EditAssignment from "./components/admin/EditAssignment";
import AddAssignment from "./components/admin/AddAssignment";
import AddQuize from "./components/admin/AddQuize";
import Quize from "./pages/students/Quize";
import EditQuize from "./components/admin/EditQuize";

function App() {
  const authChecked = useAuthChecked();
  console.log(authChecked);
  return !authChecked ? (
    <p>Authentication checking...</p>
  ) : (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/video"
          element={
            <StudentPrivateRoute>
              <CoursePlayer />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/quizze/:id"
          element={
            <StudentPrivateRoute>
              <Quize />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/leader"
          element={
            <StudentPrivateRoute>
              <LeaderBoard />
            </StudentPrivateRoute>
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment"
          element={
            <AdminPrivateRoute>
              <Assignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/addVideo"
          element={
            <AdminPrivateRoute>
              <AddVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/addAssignment"
          element={
            <AdminPrivateRoute>
              <AddAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/addQuize"
          element={
            <AdminPrivateRoute>
              <AddQuize />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/editQuize/:id"
          element={
            <AdminPrivateRoute>
              <EditQuize />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/editVideo/:id"
          element={
            <AdminPrivateRoute>
              <EditVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/editAssignment/:id"
          element={
            <AdminPrivateRoute>
              <EditAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignmentMark"
          element={
            <AdminPrivateRoute>
              <AssignmentMark />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/video"
          element={
            <AdminPrivateRoute>
              <Video />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizes"
          element={
            <AdminPrivateRoute>
              <AdminQuize />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
