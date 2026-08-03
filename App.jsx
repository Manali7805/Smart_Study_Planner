import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudyPlanner from "./pages/StudyPlanner";
import Notes from "./pages/Notes";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
// import StudyPlan from "./pages/StudyPlan";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/study-planner"
          element={<StudyPlanner />}
        />

        <Route
          path="/notes"
          element={<Notes />}
        />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/progress"
          element={<Progress />}
        />
        {/* <Route
          path="/study-plan"
          element={<StudyPlan />}
        /> */}

        <Route
          path="/profile"
          element={<Profile />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;