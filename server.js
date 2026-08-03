const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { HfInference } = require("@huggingface/inference");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// Hugging Face Client
// ===============================

const hf = new HfInference(process.env.HF_API_KEY);



// ===============================
// AI QUIZ GENERATOR API
// ===============================

app.post("/generate-quiz", async (req, res) => {

    try {

        const { topic, difficulty, number } = req.body;


        if (!topic || !difficulty || !number) {

            return res.status(400).json({

                error:
                "Topic, difficulty and number are required."

            });

        }



        const prompt = `

You are an expert teacher.

Generate exactly ${number} multiple-choice questions.

Topic: ${topic}

Difficulty: ${difficulty}


Rules:

- Return ONLY valid JSON.
- No markdown.
- No explanation outside JSON.
- Each question must have exactly 4 options.


Format:


[
  {
    "question": "",
    "options": ["", "", "", ""],
    "answer": "",
    "explanation": ""
  }
]

`;



        const response = await hf.chatCompletion({

            model:
            "meta-llama/Llama-3.1-8B-Instruct",


            messages: [

                {

                    role:"system",

                    content:
                    "You are an AI quiz generator. Always return only valid JSON."

                },


                {

                    role:"user",

                    content:prompt

                }

            ],


            max_tokens:1200,

            temperature:0.7


        });



        let text =
        response.choices[0].message.content;



        text = text
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();



        const quiz = JSON.parse(text);



        res.json({

            source:
            "Hugging Face AI",

            quiz:quiz

        });



    }

    catch(error){


        console.error(
            "HF QUIZ ERROR:",
            error
        );


        res.status(500).json({

            error:error.message

        });


    }


});







// ===============================
// AI SMART STUDY PLANNER API
// ===============================


app.post("/generate-plan", async(req,res)=>{


    try{


        const {

            examDate,

            subjects,

            dailyHours


        } = req.body;




        if(
            !examDate ||
            !subjects ||
            !dailyHours
        ){

            return res.status(400).json({

                error:
                "Exam date, subjects and daily hours are required."

            });

        }





        let studyPlan=[];



        // Priority Calculation

        subjects.forEach(subject=>{


            subject.topics.forEach(topic=>{


                let priority =

                (topic.difficulty * 30)

                +

                (subject.weight * 40);



                studyPlan.push({


                    subject:
                    subject.name,


                    topic:
                    topic.name,


                    difficulty:
                    topic.difficulty,


                    priority:
                    priority


                });



            });


        });





        // Sort according to priority

        studyPlan.sort(

            (a,b)=>

            b.priority-a.priority

        );





        // Generate timetable


        let schedule=[];


        let remainingHours =
        Number(dailyHours);



        studyPlan.forEach((task,index)=>{


            if(remainingHours > 0){



                schedule.push({


                    day:
                    `Day ${index+1}`,


                    time:

                    index % 2 === 0

                    ?

                    "Morning"

                    :

                    "Evening",



                    subject:
                    task.subject,



                    topic:
                    task.topic,



                    duration:
                    "60 minutes",



                    difficulty:
                    task.difficulty,



                    priority:
                    task.priority



                });



                remainingHours--;



            }



        });





        res.json({


            message:
            "AI Study Plan Generated Successfully",


            examDate:
            examDate,


            schedule:
            schedule



        });





    }


    catch(error){



        console.error(

            "PLANNER ERROR:",

            error

        );



        res.status(500).json({


            error:
            error.message


        });



    }



});







// ===============================
// SERVER START
// ===============================


app.listen(5000,()=>{


    console.log(
        "Backend running on port 5000"
    );


});