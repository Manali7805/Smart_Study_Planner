import { useEffect, useState } from "react";

function StudyCard() {

  const [studyHours, setStudyHours] = useState(0);


  useEffect(() => {

    const calculateStudyHours = () => {

      const savedTasks =
        localStorage.getItem("studyTasks");

      const tasks = savedTasks
        ? JSON.parse(savedTasks)
        : [];


      // Count only incomplete tasks
      const pendingTasks = tasks.filter(
        (task) => !task.completed
      );


      /*
        For now:
        Each pending task = 1 hour.

        Later, AI Scheduler will provide
        the actual duration of each task.
      */

      const totalHours = pendingTasks.length;


      setStudyHours(totalHours);

    };


    calculateStudyHours();


    // Listen for changes
    window.addEventListener(
      "storage",
      calculateStudyHours
    );


    // Refresh when tasks change
    const interval = setInterval(
      calculateStudyHours,
      500
    );


    return () => {

      window.removeEventListener(
        "storage",
        calculateStudyHours
      );

      clearInterval(interval);

    };

  }, []);


  return (

    <div className="study-card">

      <h3>
         Study Hours
      </h3>


      <h1>
        {studyHours}{" "}
        {studyHours === 1 ? "Hour" : "Hours"}
      </h1>


      <p>
        Planned study time
      </p>

    </div>

  );

}


export default StudyCard;