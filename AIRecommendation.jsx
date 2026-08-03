import { useEffect, useState } from "react";

function AIRecommendation() {

  const [recommendations, setRecommendations] =
    useState([]);


  useEffect(() => {

    const generateRecommendations = () => {

      const savedTasks =
        localStorage.getItem("studyTasks");

      const tasks = savedTasks
        ? JSON.parse(savedTasks)
        : [];


      if (tasks.length === 0) {

        setRecommendations([
          " Add your first study task to get personalized recommendations.",
          " Set a difficulty level for each topic.",
          " Add your available study duration."
        ]);

        return;

      }


      const pendingTasks =
        tasks.filter(
          (task) => !task.completed
        );


      const completedTasks =
        tasks.filter(
          (task) => task.completed
        );


      const newRecommendations = [];


      // ==========================
      // NO PENDING TASKS
      // ==========================

      if (pendingTasks.length === 0) {

        setRecommendations([
          " Excellent! You have completed all your study tasks.",
          " Use this time for quick revision.",
          " Great job! Keep your study streak going."
        ]);

        return;

      }


      // ==========================
      // HIGH PRIORITY TASK
      // ==========================

      const highPriorityTask =
        pendingTasks.find(
          (task) =>
            task.priority === "High"
        );


      if (highPriorityTask) {

        newRecommendations.push(
          ` Focus first on ${highPriorityTask.topic} (${highPriorityTask.subject}) because it has high priority.`
        );

      }


      // ==========================
      // DIFFICULT TASK
      // ==========================

      const difficultTask =
        pendingTasks
          .filter(
            (task) =>
              Number(task.difficulty) >= 4
          )
          .sort(
            (a, b) =>
              Number(b.difficulty) -
              Number(a.difficulty)
          )[0];


      if (difficultTask) {

        newRecommendations.push(
          ` Give extra attention to ${difficultTask.topic}. Difficulty: ${difficultTask.difficulty}/5.`
        );

      }


      // ==========================
      // TODAY'S TASK
      // ==========================

      const today =
        new Date()
          .toISOString()
          .split("T")[0];


      const todayTasks =
        pendingTasks.filter(
          (task) =>
            task.date === today
        );


      if (todayTasks.length > 0) {

        const todayMinutes =
          todayTasks.reduce(
            (total, task) =>
              total +
              (Number(task.duration) || 60),
            0
          );


        const hours =
          Math.floor(
            todayMinutes / 60
          );


        const minutes =
          todayMinutes % 60;


        let timeText = "";


        if (hours > 0) {

          timeText =
            `${hours} hour${
              hours > 1
                ? "s"
                : ""
            }`;

          if (minutes > 0) {

            timeText +=
              ` ${minutes} minutes`;

          }

        } else {

          timeText =
            `${minutes} minutes`;

        }


        newRecommendations.push(
          ` You have ${timeText} of study planned for today.`
        );

      }


      // ==========================
      // PROGRESS RECOMMENDATION
      // ==========================

      const progress =
        tasks.length === 0
          ? 0
          : Math.round(
              (completedTasks.length /
                tasks.length) *
                100
            );


      if (progress < 30) {

        newRecommendations.push(
          " Your progress is still starting. Try completing one small task first to build momentum."
        );

      }

      else if (progress < 70) {

        newRecommendations.push(
          " You're making good progress. Stay consistent and finish your pending tasks."
        );

      }

      else {

        newRecommendations.push(
          " Great progress! Focus on completing the remaining difficult topics."
        );

      }


      // ==========================
      // LIMIT RECOMMENDATIONS
      // ==========================

      setRecommendations(
        newRecommendations.slice(0, 4)
      );

    };


    generateRecommendations();


    // Update when tasks change
    window.addEventListener(
      "studyTasksUpdated",
      generateRecommendations
    );


    window.addEventListener(
      "storage",
      generateRecommendations
    );


    // Backup refresh
    const interval =
      setInterval(
        generateRecommendations,
        1000
      );


    return () => {

      window.removeEventListener(
        "studyTasksUpdated",
        generateRecommendations
      );

      window.removeEventListener(
        "storage",
        generateRecommendations
      );

      clearInterval(interval);

    };

  }, []);


  return (

    <div className="ai-card">

      <h2>
        🤖 AI Study Recommendation
      </h2>


      <p>
        Based on your current study progress:
      </p>


      <ul>

        {recommendations.map(
          (recommendation, index) => (

            <li key={index}>

              {recommendation}

            </li>

          )
        )}

      </ul>


    </div>

  );

}


export default AIRecommendation;