import { useState } from "react";
import API from "../services/api";
import "./QuizGenerator.css";

function QuizGenerator() {

    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [number, setNumber] = useState(5);

    const [loading, setLoading] = useState(false);

    const [quiz, setQuiz] = useState([]);

    const generateQuiz = async () => {

        if (topic.trim() === "") {
            alert("Please enter a topic.");
            return;
        }

        try {

            setLoading(true);

            const response = await API.post("/generate-quiz", {

                topic,
                difficulty,
                number

            });

            setQuiz(response.data.quiz);

            setLoading(false);

        }
        catch (error) {

            console.log(error);

            alert("Failed to generate quiz.");

            setLoading(false);

        }

    };


    return (

        <div className="quiz-container">

            <div className="quiz-box">

                <h1> AI Quiz Assistant</h1>

                <p>Generate AI-powered quizzes on any subject.</p>


                <input

                    type="text"

                    placeholder="Enter Topic (Example: DBMS)"

                    value={topic}

                    onChange={(e)=>setTopic(e.target.value)}

                />



                <select

                    value={difficulty}

                    onChange={(e)=>setDifficulty(e.target.value)}

                >

                    <option>Easy</option>

                    <option>Medium</option>

                    <option>Hard</option>

                </select>



                <select

                    value={number}

                    onChange={(e)=>setNumber(Number(e.target.value))}

                >

                    <option>5</option>

                    <option>10</option>

                    <option>15</option>

                    <option>20</option>

                </select>



                <button

                    onClick={generateQuiz}

                >

                    {

                        loading

                        ?

                        "Generating..."

                        :

                        " Generate Quiz"

                    }

                </button>


                {

                    quiz.length>0 &&

                    <div className="quiz-preview">

                        <h2>Generated Questions</h2>

                        {

                            quiz.map((q,index)=>(

                                <div
                                    key={index}
                                    className="question-card"
                                >

                                    <h3>

                                        {index+1}. {q.question}

                                    </h3>

                                    {

                                        q.options.map((option,i)=>(

                                            <p key={i}>

                                                • {option}

                                            </p>

                                        ))

                                    }

                                </div>

                            ))

                        }

                    </div>

                }


            </div>

        </div>

    );

}

export default QuizGenerator;