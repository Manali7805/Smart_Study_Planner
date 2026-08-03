import { updateStudyStreak } from "../utils/streak";
import { useState } from "react";
import "../styles/Quiz.css";
import API from "../services/api";


function Quiz() {


    const [topic, setTopic] = useState("");

    const [difficulty, setDifficulty] = useState("Easy");

    const [number, setNumber] = useState(5);



    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);


    const [selectedAnswer, setSelectedAnswer] = useState("");


    const [score, setScore] = useState(0);



    const [quizStarted, setQuizStarted] = useState(false);

    const [showResult, setShowResult] = useState(false);


    const [loading, setLoading] = useState(false);


    const [showExplanation, setShowExplanation] = useState(false);

    const [isCorrect, setIsCorrect] = useState(false);





    // Generate AI Quiz

    const generateQuiz = async () => {


        if(topic.trim()===""){

            alert("Please enter a topic");

            return;

        }


        try{


            setLoading(true);


            const response = await API.post(
                "/generate-quiz",
                {
                    topic,
                    difficulty,
                    number
                }
            );



            setQuestions(response.data.quiz);

            setCurrentQuestion(0);

            setScore(0);

            setSelectedAnswer("");

            setQuizStarted(true);

            setShowResult(false);

            setShowExplanation(false);


        }

        catch(error){

            console.log(error);

            alert("Quiz generation failed");

        }


        finally{

            setLoading(false);

        }


    };









    // Submit Answer

    const submitAnswer = () => {


        if(selectedAnswer===""){

            alert("Please select an answer");

            return;

        }



        const correct =

        selectedAnswer === questions[currentQuestion].answer;



        setIsCorrect(correct);



        if(correct){

            setScore(prev => prev + 1);

        }



        setShowExplanation(true);


    };









    // Save Progress

    const saveProgress = (finalScore) => {


        const percentage = Math.round(

            (finalScore / questions.length) * 100

        );



        const quizResult = {


            topic,

            difficulty,

            score: finalScore,

            total: questions.length,

            percentage,

            date:new Date().toLocaleDateString()


        };




        const oldProgress = JSON.parse(

            localStorage.getItem("quizProgress")

        ) || [];




        localStorage.setItem(

            "quizProgress",

            JSON.stringify(

                [

                    ...oldProgress,

                    quizResult

                ]

            )

        );


    };









    // Next Question

    const nextQuestion = () => {


        setShowExplanation(false);

        setSelectedAnswer("");



        if(currentQuestion < questions.length - 1){


            setCurrentQuestion(

                currentQuestion + 1

            );


        }


        else{


            let finalScore = score;


            if(isCorrect){

                finalScore = score + 1;

            }



            saveProgress(finalScore);

            updateStudyStreak();



            setScore(finalScore);


            setShowResult(true);


        }


    };











    // Restart Quiz

    const restartQuiz = () => {


        setQuizStarted(false);

        setShowResult(false);

        setQuestions([]);

        setCurrentQuestion(0);

        setSelectedAnswer("");

        setScore(0);

        setTopic("");

        setDifficulty("Easy");

        setNumber(5);

        setShowExplanation(false);


    };









    return (

        <div className="quiz-page">


            <h1>
                🤖 AI Quiz Assistant
            </h1>


            <p>
                Generate AI quizzes on any subject
            </p>





            <div className="quiz-container">


                <div className="quiz-generator">


                    <h2>
                        🎯 Generate Quiz
                    </h2>




                    <input

                        type="text"

                        placeholder="Enter Topic (AI, DBMS, Biology...)"

                        value={topic}

                        onChange={(e)=>
                            setTopic(e.target.value)
                        }

                    />





                    <select

                        value={difficulty}

                        onChange={(e)=>
                            setDifficulty(e.target.value)
                        }

                    >

                        <option>Easy</option>

                        <option>Medium</option>

                        <option>Hard</option>


                    </select>





                    <select

                        value={number}

                        onChange={(e)=>
                            setNumber(Number(e.target.value))
                        }

                    >

                        <option value="3">
                            3 Questions
                        </option>


                        <option value="5">
                            5 Questions
                        </option>


                        <option value="10">
                            10 Questions
                        </option>


                    </select>







                    <button onClick={generateQuiz}>


                    {
                        loading

                        ?

                        "🤖 Generating..."

                        :

                        "🚀 Generate Quiz"

                    }


                    </button>



                </div>









                <div className="question-section">


                {

                !quizStarted ?

                (

                    <div className="question-card">

                        <h3>
                            Start your AI Quiz 🚀
                        </h3>

                        <p>
                            Enter topic and generate questions.
                        </p>


                    </div>

                )


                :


                showResult ?


                (

                    <div className="question-card">


                        <h2>
                            🎉 Quiz Completed
                        </h2>


                        <h3>
                            Score: {score}/{questions.length}
                        </h3>


                        <p>

                            Percentage:

                            {" "}

                            {Math.round(
                                (score/questions.length)*100
                            )}%

                        </p>




                        <button onClick={restartQuiz}>

                            🔄 Restart Quiz

                        </button>



                    </div>

                )


                :


                (

                <>


                <h2>

                    📚 Question {currentQuestion+1}/{questions.length}

                </h2>




                <div className="question-card">


                    <h3>

                        {questions[currentQuestion].question}

                    </h3>





                    {
                    questions[currentQuestion].options.map(

                    (option,index)=>(


                    <label key={index}>


                        <input

                            type="radio"

                            name="answer"

                            value={option}

                            checked={
                                selectedAnswer===option
                            }

                            onChange={(e)=>
                                setSelectedAnswer(
                                    e.target.value
                                )
                            }

                        />


                        {option}


                    </label>


                    )

                    )

                    }






                    {!showExplanation &&

                    <button onClick={submitAnswer}>

                        Submit Answer

                    </button>

                    }







                    {showExplanation &&


                    <div className="explanation-box">


                        <h3>

                        {

                        isCorrect

                        ?

                        "✅ Correct Answer"

                        :

                        "❌ Wrong Answer"

                        }


                        </h3>



                        <p>

                        <b>Correct Answer:</b>

                        {" "}

                        {questions[currentQuestion].answer}

                        </p>




                        <p>

                        📖 {questions[currentQuestion].explanation}

                        </p>





                        <button onClick={nextQuestion}>


                        {

                        currentQuestion === questions.length-1

                        ?

                        "🏆 Show Result"

                        :

                        "➡ Next Question"

                        }


                        </button>



                    </div>


                    }



                </div>


                </>


                )

                }



                </div>





            </div>



        </div>

    );

}


export default Quiz;