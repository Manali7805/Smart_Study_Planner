import { useEffect, useState } from "react";

function WeeklyProgress() {

  const [progressData, setProgressData] =
    useState([]);


  useEffect(() => {

    const calculateWeeklyProgress = () => {

      const savedTasks =
        localStorage.getItem("studyTasks");

      const tasks = savedTasks
        ? JSON.parse(savedTasks)
        : [];


      // ==========================
      // GET CURRENT WEEK
      // ==========================

      const today = new Date();

      const dayOfWeek =
        today.getDay();

      // Monday = 0
      const monday = new Date(today);

      const daysFromMonday =
        dayOfWeek === 0
          ? 6
          : dayOfWeek - 1;

      monday.setDate(
        today.getDate() -
        daysFromMonday
      );

      monday.setHours(
        0, 0, 0, 0
      );


      // ==========================
      // WEEK DAYS
      // ==========================

      const weekDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ];


      const weeklyData =
        weekDays.map(
          (day, index) => {

            const currentDay =
              new Date(monday);

            currentDay.setDate(
              monday.getDate() +
              index
            );


            const year =
              currentDay.getFullYear();

            const month =
              String(
                currentDay.getMonth() + 1
              ).padStart(2, "0");

            const date =
              String(
                currentDay.getDate()
              ).padStart(2, "0");


            const dateString =
              `${year}-${month}-${date}`;


            // Tasks for this day
            const dayTasks =
              tasks.filter(
                (task) =>
                  task.date === dateString
              );


            // Completed tasks
            const completedTasks =
              dayTasks.filter(
                (task) =>
                  task.completed
              );


            let progress = 0;


            if (dayTasks.length > 0) {

              progress =
                Math.round(
                  (completedTasks.length /
                    dayTasks.length) *
                    100
                );

            }


            return {

              day,

              progress,

              total:
                dayTasks.length,

              completed:
                completedTasks.length

            };

          }
        );


      setProgressData(
        weeklyData
      );

    };


    calculateWeeklyProgress();


    // Update when tasks change
    window.addEventListener(
      "studyTasksUpdated",
      calculateWeeklyProgress
    );


    window.addEventListener(
      "storage",
      calculateWeeklyProgress
    );


    // Backup refresh
    const interval =
      setInterval(
        calculateWeeklyProgress,
        1000
      );


    return () => {

      window.removeEventListener(
        "studyTasksUpdated",
        calculateWeeklyProgress
      );

      window.removeEventListener(
        "storage",
        calculateWeeklyProgress
      );

      clearInterval(interval);

    };

  }, []);


  return (

    <div className="weekly-card">


      <h2>
        📊 Weekly Progress
      </h2>


      {progressData.map(
        (item, index) => (

          <div
            className="progress-row"
            key={index}
          >


            <span>
              {item.day}
            </span>


            <div className="progress-bar">

              <div

                className="progress-fill"

                style={{
                  width:
                    `${item.progress}%`
                }}

              />

            </div>


            <span>
              {item.progress}%
            </span>


          </div>

        )
      )}


    </div>

  );

}


export default WeeklyProgress;