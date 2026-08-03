import { useContext } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import StudyCard from "../components/StudyCard";
import ProgressCard from "../components/ProgressCard";
import TaskCard from "../components/TaskCard";

import AIRecommendation from "../components/AIRecommendation";
import StudySchedule from "../components/StudySchedule";
import StreakCard from "../components/StreakCard";
import WeeklyProgress from "../components/WeeklyProgress";
import AchievementCard from "../components/AchievementCard";

import { AuthContext } from "../context/AuthContext";


function Dashboard() {

  const { user } =
    useContext(AuthContext);


  // Get name from logged-in user
  const userName =
    user?.name ||
    user?.username ||
    "Student";


  return (

    <div className="dashboard">


      {/* =========================
          SIDEBAR
      ========================== */}

      <Sidebar />


      <div className="dashboard-main">


        {/* =========================
            NAVBAR
        ========================== */}

        <Navbar />


        <div className="dashboard-content">


          {/* =========================
              WELCOME
          ========================== */}

          <h1>

            Welcome Back, {userName} 

          </h1>


          <p>

            Let's plan your smart study journey with AI.

          </p>



          {/* =========================
              TOP CARDS
          ========================== */}

          <div className="cards-container">

            <StudyCard />

            <ProgressCard />

            <TaskCard />

          </div>



          {/* =========================
              AI + SCHEDULE
          ========================== */}

          <div className="ai-schedule-container">

            <AIRecommendation />

            <StudySchedule />

          </div>



          {/* =========================
              STREAK + WEEKLY
          ========================== */}

          <div className="bottom-dashboard-container">

            <StreakCard />

            <WeeklyProgress />

          </div>



          {/* =========================
              ACHIEVEMENTS
          ========================== */}

          <div className="achievement-container">

            <AchievementCard />

          </div>


        </div>


      </div>


    </div>

  );

}


export default Dashboard;