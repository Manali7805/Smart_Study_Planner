import { useEffect, useState } from "react";

function ProgressCard() {

  const [progress, setProgress] = useState(0);


  useEffect(() => {

    const calculateProgress = () => {

      const savedTasks =
        localStorage.getItem("studyTasks");

      const tasks = savedTasks
        ? JSON.parse(savedTasks)
        : [];


      if (tasks.length === 0) {

        setProgress(0);

        return;

      }


      const completedTasks =
        tasks.filter(
          (task) => task.completed
        ).length;


      const percentage =
        Math.round(
          (completedTasks /
            tasks.length) *
            100
        );


      setProgress(percentage);

    };


    // Calculate when dashboard opens
    calculateProgress();


    // Listen for our custom task update event
    window.addEventListener(
      "studyTasksUpdated",
      calculateProgress
    );


    // Also listen for storage changes
    window.addEventListener(
      "storage",
      calculateProgress
    );


    // Backup refresh
    const interval = setInterval(
      calculateProgress,
      500
    );


    return () => {

      window.removeEventListener(
        "studyTasksUpdated",
        calculateProgress
      );

      window.removeEventListener(
        "storage",
        calculateProgress
      );

      clearInterval(interval);

    };

  }, []);


  return (

    <div className="progress-card">

      <h3>
         Progress
      </h3>


      <h1>
        {progress}%
      </h1>


      <p>
        Overall learning progress
      </p>

    </div>

  );

}


export default ProgressCard;