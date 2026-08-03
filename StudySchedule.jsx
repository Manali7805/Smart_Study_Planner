import { useEffect, useState } from "react";

function StudySchedule() {

  const [todayTasks, setTodayTasks] = useState([]);


  useEffect(() => {

    const loadSchedule = () => {

      const savedTasks =
        localStorage.getItem("studyTasks");

      const tasks = savedTasks
        ? JSON.parse(savedTasks)
        : [];


      // Today's date
      const today =
        new Date()
          .toISOString()
          .split("T")[0];


      // Get today's tasks
      const filteredTasks =
        tasks
          .filter(
            (task) =>
              task.date === today
          )
          .sort(
            (a, b) =>
              Number(b.difficulty || 3) -
              Number(a.difficulty || 3)
          );


      setTodayTasks(filteredTasks);

    };


    loadSchedule();


    // Update when StudyPlanner changes
    window.addEventListener(
      "studyTasksUpdated",
      loadSchedule
    );


    window.addEventListener(
      "storage",
      loadSchedule
    );


    // Backup refresh
    const interval =
      setInterval(
        loadSchedule,
        1000
      );


    return () => {

      window.removeEventListener(
        "studyTasksUpdated",
        loadSchedule
      );

      window.removeEventListener(
        "storage",
        loadSchedule
      );

      clearInterval(interval);

    };

  }, []);


  // ==========================
  // FORMAT TIME
  // ==========================

  const formatTime = (minutes) => {

    const hours =
      Math.floor(minutes / 60);

    const mins =
      minutes % 60;


    const period =
      hours >= 12
        ? "PM"
        : "AM";


    let displayHour =
      hours % 12;


    if (displayHour === 0) {
      displayHour = 12;
    }


    const displayMinutes =
      String(mins).padStart(2, "0");


    return `${displayHour}:${displayMinutes} ${period}`;

  };


  // ==========================
  // SCHEDULE
  // ==========================

  let currentMinutes = 9 * 60;


  const schedule =
    todayTasks.map((task) => {

      const startTime =
        currentMinutes;


      const duration =
        Number(task.duration) || 60;


      currentMinutes += duration;


      return {

        ...task,

        startTime

      };

    });


  return (

    <div className="schedule-card">


      <h2>
         Today's Study Schedule
      </h2>


      {schedule.length === 0 ? (

        <div className="schedule-empty">

          <p>
             No study tasks scheduled for today.
          </p>

          <small>
            Add a task with today's date
            to see it here.
          </small>

        </div>

      ) : (

        schedule.map(
          (task, index) => (

            <div
              className="schedule-item"
              key={
                task.id ||
                index
              }
            >


              <span>

                {" "}

                {formatTime(
                  task.startTime
                )}

              </span>


              <div className="schedule-task-info">

                <p>

                  {task.completed
                    ? "✅ "
                    : " "
                  }

                  {task.topic}

                </p>


                <small>

                  {task.subject}

                  {" • "}

                  {task.duration || 60}
                  {" min"}

                </small>

              </div>


              <span
                className={
                  task.completed
                    ? "completed"
                    : "pending"
                }
              >

                {task.completed
                  ? " Completed"
                  : " Pending"
                }

              </span>


            </div>

          )
        )

      )}


    </div>

  );

}


export default StudySchedule;