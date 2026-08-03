import { useState, useEffect } from "react";

function StudyPlanner() {

  // ==========================
  // TASK STATE
  // ==========================

  const emptyTask = {
    subject: "",
    topic: "",
    date: "",
    duration: 60,
    difficulty: 3,
    priority: "Medium",
    completed: false
  };


  const [task, setTask] = useState(emptyTask);


  // ==========================
  // EXISTING TASKS
  // ==========================

  const [tasks, setTasks] = useState(() => {

    try {

      const savedTasks =
        localStorage.getItem("studyTasks");

      if (!savedTasks) {
        return [];
      }

      const parsedTasks = JSON.parse(savedTasks);

      // Make old tasks compatible with new fields
      return parsedTasks.map((item) => ({
        ...item,

        duration:
          Number(item.duration) || 60,

        difficulty:
          Number(item.difficulty) || 3,

        priority:
          item.priority || "Medium",

        completed:
          Boolean(item.completed)
      }));

    } catch (error) {

      console.error(
        "Error loading study tasks:",
        error
      );

      return [];

    }

  });


  // ==========================
  // AI PLANNER STATES
  // ==========================

  const [examDate, setExamDate] = useState("");

  const [dailyHours, setDailyHours] =
    useState(3);

  const [aiPlan, setAiPlan] = useState([]);

  const [isGenerating, setIsGenerating] =
    useState(false);


  // ==========================
  // SAVE TASKS
  // ==========================

  useEffect(() => {

    localStorage.setItem(
      "studyTasks",
      JSON.stringify(tasks)
    );

    // Tell other components that tasks changed
    window.dispatchEvent(
      new Event("studyTasksUpdated")
    );

  }, [tasks]);


  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setTask((previousTask) => ({

      ...previousTask,

      [name]:
        name === "duration" ||
        name === "difficulty"

          ? Number(value)

          : value

    }));

  };


  // ==========================
  // ADD TASK
  // ==========================

  const addTask = (e) => {

    e.preventDefault();


    if (!task.subject.trim()) {

      alert("Please enter a subject.");

      return;

    }


    if (!task.topic.trim()) {

      alert("Please enter a topic.");

      return;

    }


    if (!task.date) {

      alert("Please select a study date.");

      return;

    }


    if (
      !task.duration ||
      task.duration < 15
    ) {

      alert(
        "Study duration must be at least 15 minutes."
      );

      return;

    }


    const newTask = {

      ...task,

      id: Date.now(),

      duration:
        Number(task.duration),

      difficulty:
        Number(task.difficulty),

      completed: false

    };


    setTasks((previousTasks) => [

      ...previousTasks,

      newTask

    ]);


    setTask(emptyTask);

  };


  // ==========================
  // COMPLETE TASK
  // ==========================

  const toggleComplete = (index) => {

    setTasks((previousTasks) =>

      previousTasks.map((item, i) => {

        if (i === index) {

          return {

            ...item,

            completed:
              !item.completed

          };

        }

        return item;

      })

    );

  };


  // ==========================
  // DELETE TASK
  // ==========================

  const deleteTask = (index) => {

    setTasks((previousTasks) =>

      previousTasks.filter(
        (_, i) => i !== index
      )

    );

  };


  // ==========================
  // STATISTICS
  // ==========================

  const totalTasks =
    tasks.length;


  const completedTasks =
    tasks.filter(
      (item) => item.completed
    ).length;


  const pendingTasks =
    totalTasks - completedTasks;


  const progressPercentage =
    totalTasks === 0

      ? 0

      : Math.round(
          (completedTasks /
            totalTasks) *
            100
        );


  // ==========================
  // TOTAL PLANNED TIME
  // ==========================

  const totalStudyMinutes =
    tasks
      .filter(
        (item) => !item.completed
      )
      .reduce(

        (total, item) =>

          total +
          (Number(item.duration) || 60),

        0

      );


  const totalHours =
    Math.floor(
      totalStudyMinutes / 60
    );


  const remainingMinutes =
    totalStudyMinutes % 60;


  // ==========================
  // AI STUDY PLAN GENERATOR
  // ==========================

  const generateAIPlan = async () => {

    if (!examDate) {

      alert(
        "Please select your exam date."
      );

      return;

    }


    if (
      !dailyHours ||
      Number(dailyHours) <= 0
    ) {

      alert(
        "Please enter valid daily study hours."
      );

      return;

    }


    setIsGenerating(true);

    setAiPlan([]);


    try {

      const response = await fetch(

        "http://localhost:5000/generate-plan",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            examDate,

            dailyHours:
              Number(dailyHours),

            subjects: [

              {

                name:
                  "Operating System",

                weight: 5,

                topics: [

                  {

                    name:
                      "CPU Scheduling",

                    difficulty: 5

                  },

                  {

                    name:
                      "Memory Management",

                    difficulty: 4

                  }

                ]

              },

              {

                name: "DBMS",

                weight: 4,

                topics: [

                  {

                    name:
                      "Normalization",

                    difficulty: 3

                  }

                ]

              }

            ]

          })

        }

      );


      if (!response.ok) {

        throw new Error(
          `Server returned ${response.status}`
        );

      }


      const data =
        await response.json();


      console.log(
        "AI PLAN RESPONSE:",
        data
      );


      if (
        Array.isArray(data.schedule)
      ) {

        setAiPlan(
          data.schedule
        );

      }

      else if (
        Array.isArray(data.plan)
      ) {

        setAiPlan(
          data.plan
        );

      }

      else if (
        Array.isArray(data.aiPlan)
      ) {

        setAiPlan(
          data.aiPlan
        );

      }

      else {

        console.error(
          "Unexpected AI response:",
          data
        );

        alert(
          "AI did not return a valid study schedule."
        );

      }


    }

    catch (error) {

      console.error(
        "AI Planner Error:",
        error
      );


      alert(
        "Unable to generate AI plan. Make sure the backend is running on port 5000."
      );

    }

    finally {

      setIsGenerating(false);

    }

  };


  // ==========================
  // RETURN UI
  // ==========================

  return (

    <div className="planner-page">


      <h1>
        📚 AI Smart Study Planner
      </h1>


      <p>
        Plan your daily learning journey with AI
      </p>


      {/* ==========================
          TASK OVERVIEW
      ========================== */}

      <div className="stats-card">

        <h2>
          📊 Task Overview
        </h2>


        <div className="stats-container">


          <div>

            <h3>
              {totalTasks}
            </h3>

            <p>
              Total Tasks
            </p>

          </div>


          <div>

            <h3>
              {completedTasks}
            </h3>

            <p>
              Completed
            </p>

          </div>


          <div>

            <h3>
              {pendingTasks}
            </h3>

            <p>
              Pending
            </p>

          </div>


          <div>

            <h3>
              {progressPercentage}%
            </h3>

            <p>
              Progress
            </p>

          </div>


        </div>


        <div className="progress-bar">

          <div

            className="progress-fill"

            style={{
              width:
                `${progressPercentage}%`
            }}

          />

        </div>

      </div>


      {/* ==========================
          PLANNED STUDY TIME
      ========================== */}

      <div className="stats-card">

        <h2>
          ⏱️ Planned Study Time
        </h2>


        <h3>

          {totalHours > 0 &&
            `${totalHours} ${
              totalHours === 1
                ? "Hour"
                : "Hours"
            }`
          }

          {totalHours > 0 &&
            remainingMinutes > 0 &&
            ` ${remainingMinutes} min`
          }

          {totalHours === 0 &&
            remainingMinutes === 0 &&
            "0 Minutes"
          }

          {totalHours === 0 &&
            remainingMinutes > 0 &&
            `${remainingMinutes} Minutes`
          }

        </h3>


        <p>
          Total remaining study time
        </p>

      </div>


      <div className="planner-container">


        {/* ==========================
            ADD TASK
        ========================== */}

        <form

          className="planner-form"

          onSubmit={addTask}

        >

          <h2>
            ➕ Add Study Task
          </h2>


          <input

            type="text"

            name="subject"

            placeholder="Enter Subject"

            value={task.subject}

            onChange={handleChange}

            required

          />


          <input

            type="text"

            name="topic"

            placeholder="Enter Topic"

            value={task.topic}

            onChange={handleChange}

            required

          />


          <input

            type="date"

            name="date"

            value={task.date}

            onChange={handleChange}

            required

          />


          {/* DURATION */}

          <input

            type="number"

            name="duration"

            placeholder="Study Duration (minutes)"

            value={task.duration}

            onChange={handleChange}

            min="15"

            step="15"

            required

          />


          {/* DIFFICULTY */}

          <select

            name="difficulty"

            value={task.difficulty}

            onChange={handleChange}

          >

            <option value="1">
              Difficulty 1 - Easy
            </option>

            <option value="2">
              Difficulty 2
            </option>

            <option value="3">
              Difficulty 3 - Medium
            </option>

            <option value="4">
              Difficulty 4
            </option>

            <option value="5">
              Difficulty 5 - Hard
            </option>

          </select>


          {/* PRIORITY */}

          <select

            name="priority"

            value={task.priority}

            onChange={handleChange}

          >

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>


          <button type="submit">

            ➕ Add Task

          </button>


        </form>


        {/* ==========================
            TASK LIST
        ========================== */}

        <div className="task-section">


          <h2>
            📌 Your Study Tasks
          </h2>


          {tasks.length === 0 ? (

            <div className="empty-task">

              <h3>
                No tasks added yet 📚
              </h3>

              <p>
                Add your first study task.
              </p>

            </div>

          ) : (

            <div className="task-list">


              {tasks.map(
                (item, index) => (

                  <div

                    className="planner-task"

                    key={
                      item.id ||
                      index
                    }

                  >

                    <h3>
                      📚 {item.subject}
                    </h3>


                    <p>
                      📖 {item.topic}
                    </p>


                    <p>
                      📅 {item.date}
                    </p>


                    <p>
                      ⏱️{" "}
                      {item.duration || 60}
                      {" "}minutes
                    </p>


                    <p>
                      🎯 Difficulty:{" "}
                      {item.difficulty || 3}
                      /5
                    </p>


                    <span>
                      ⭐ {item.priority}
                    </span>


                    <label>

                      <input

                        type="checkbox"

                        checked={
                          item.completed
                        }

                        onChange={() =>
                          toggleComplete(index)
                        }

                      />


                      {item.completed
                        ? " Completed"
                        : " Mark Completed"
                      }

                    </label>


                    <button

                      type="button"

                      className="delete-btn"

                      onClick={() =>
                        deleteTask(index)
                      }

                    >

                      🗑 Delete

                    </button>


                  </div>

                )
              )}


            </div>

          )}


        </div>


      </div>


      {/* ==========================
          AI PLANNER
      ========================== */}


      <div className="stats-card">


        <h2>
          🤖 AI Study Plan Generator
        </h2>


        <p>
          Tell AI when your exam is and
          how many hours you can study daily.
        </p>


        <input

          type="date"

          value={examDate}

          onChange={(e) =>
            setExamDate(e.target.value)
          }

        />


        <input

          type="number"

          min="1"

          max="24"

          value={dailyHours}

          onChange={(e) =>
            setDailyHours(
              Number(e.target.value)
            )
          }

          placeholder="Daily Study Hours"

        />


        <button

          type="button"

          onClick={generateAIPlan}

          disabled={isGenerating}

        >

          {isGenerating
            ? "⏳ Generating Plan..."
            : "🚀 Generate AI Plan"
          }

        </button>


      </div>


      {/* ==========================
          AI GENERATED SCHEDULE
      ========================== */}

      <div className="task-section">


        <h2>
          📅 AI Generated Schedule
        </h2>


        {aiPlan.length === 0 ? (

          <div className="empty-task">

            <h3>
              🤖 No AI Plan Generated
            </h3>

            <p>
              Select your exam date and
              daily study hours, then click
              Generate AI Plan.
            </p>

          </div>

        ) : (

          <div className="task-list">


            {aiPlan.map(
              (item, index) => (

                <div

                  className="planner-task"

                  key={index}

                >

                  <h3>
                    {" "}
                    {item.subject ||
                      "Study"}
                  </h3>


                  <p>
                    {" "}
                    {item.topic ||
                      item.title ||
                      "Topic"}
                  </p>


                  <p>
                    {" "}
                    {item.duration ||
                      "60 minutes"}
                  </p>


                  <p>
                     Difficulty:{" "}
                    {item.difficulty ||
                      "Not specified"}
                  </p>


                  <p>
                     Priority:{" "}
                    {item.priority ||
                      item.priorityScore ||
                      "Normal"}
                  </p>


                  {item.day && (

                    <p>
                       Day: {item.day}
                    </p>

                  )}


                  {item.time && (

                    <p>
                       Time: {item.time}
                    </p>

                  )}

                </div>

              )
            )}


          </div>

        )}


      </div>


    </div>

  );

}


export default StudyPlanner;