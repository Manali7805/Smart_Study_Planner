import { calculateStreak } from "./streak";


export function getAchievements(){


    const progress = JSON.parse(
        localStorage.getItem("quizProgress")
    ) || [];



    const achievements = [];



    // First Quiz

    if(progress.length >= 1){

        achievements.push({

            title:"First Quiz Completed",

            icon:"🥉",

            unlocked:true

        });

    }





    // 5 Quizzes

    if(progress.length >= 5){

        achievements.push({

            title:"Quiz Explorer",

            icon:"🥈",

            unlocked:true

        });

    }





    // 20 Quizzes

    if(progress.length >= 20){

        achievements.push({

            title:"Quiz Master",

            icon:"🥇",

            unlocked:true

        });

    }





    // Perfect Score

    const perfectScore = progress.some(

        item => item.percentage === 100

    );



    if(perfectScore){

        achievements.push({

            title:"Perfect Score",

            icon:"🎯",

            unlocked:true

        });

    }





    // Streak Achievement

    const streak = calculateStreak();



    if(streak >= 7){

        achievements.push({

            title:"Consistency Champion",

            icon:"🔥",

            unlocked:true

        });

    }





    // Subject Expert

    const subjects = [

        ...new Set(

            progress.map(

                item=>item.topic

            )

        )

    ];



    if(subjects.length >= 5){


        achievements.push({

            title:"Subject Expert",

            icon:"📚",

            unlocked:true

        });


    }




    return achievements;


}