import { useEffect, useState } from "react";

function TaskCard() {

  const [todayTasks, setTodayTasks] = useState([]);


  useEffect(() => {

    const loadTodayTasks = () => {

      const savedTasks =
        localStorage.getItem("studyTasks");

      const tasks = savedTasks
        ? JSON.parse(savedTasks)
        : [];


      // Get today's date in YYYY-MM-DD format
      const today =
        new Date().toISOString().split("T")[0];


      // Find today's tasks
      const filteredTasks = tasks.filter(
        (task) => task.date === today
      );


      setTodayTasks(filteredTasks);

    };


    // Load tasks when dashboard opens
    loadTodayTasks();


    // Update when StudyPlanner changes
    window.addEventListener(
      "studyTasksUpdated",
      loadTodayTasks
    );


    // Listen for localStorage changes
    window.addEventListener(
      "storage",
      loadTodayTasks
    );


    // Backup refresh
    const interval = setInterval(
      loadTodayTasks,
      500
    );


    return () => {

      window.removeEventListener(
        "studyTasksUpdated",
        loadTodayTasks
      );

      window.removeEventListener(
        "storage",
        loadTodayTasks
      );

      clearInterval(interval);

    };

  }, []);


  return (

    <div className="task-card">

      <h3>
         Today's Tasks
      </h3>


      {todayTasks.length === 0 ? (

        <div className="no-tasks">

          <p>
             No tasks scheduled for today!
          </p>

          <small>
            Enjoy your free time or add a new study task.
          </small>

        </div>

      ) : (

        <ul>

          {todayTasks.map(
            (task, index) => (

              <li
                key={
                  task.id || index
                }
              >

                <div>

                  <strong>
                    {task.completed
                      ? " "
                      : " "
                    }

                    {task.topic}
                  </strong>


                  <small>
                    {task.subject}
                  </small>


                  <span>
                    ⏱{" "}
                    {task.duration || 60}
                    {" "}min
                  </span>

                </div>

              </li>

            )
          )}

        </ul>

      )}

    </div>

  );

}


export default TaskCard;