const express = require("express");
const router = express.Router();


// Generate AI Study Plan
router.post("/generate-plan", async (req, res) => {

    try {

        const {
            examDate,
            subjects,
            dailyHours
        } = req.body;


        let plan = [];


        subjects.forEach(subject => {

            subject.topics.forEach(topic => {

                let priority =
                    (topic.difficulty * 30) +
                    (subject.weight * 40);


                plan.push({

                    subject: subject.name,
                    topic: topic.name,
                    difficulty: topic.difficulty,
                    priority: priority

                });

            });

        });


        // Sort by priority
        plan.sort(
            (a,b)=> b.priority - a.priority
        );


        res.json({

            message:"AI Study Plan Generated",

            plan

        });


    }
    catch(error){

        res.status(500).json({
            error:error.message
        });

    }

});


module.exports = router;