import { useEffect, useState } from "react";
import { calculateStreak } from "../utils/streak";


function StreakCard() {


  const [streak, setStreak] = useState(0);



  useEffect(() => {


    const updateStreak = () => {

      const currentStreak = calculateStreak();

      setStreak(currentStreak);

    };


    updateStreak();


  }, []);





  return (

    <div className="streak-card">


      <h2>
        🔥 Study Streak
      </h2>




      <h1>
        {streak} Days
      </h1>





      <p>

        {

          streak > 0

          ?

          "Amazing! You are maintaining your learning consistency."

          :

          "Start learning today and build your streak!"

        }

      </p>





      {

        streak >= 7

        ?

        <div className="badge">

          🏆 Consistency Champion

        </div>


        :


        streak > 0

        ?

        <div className="badge">

          🌱 Learning Starter

        </div>


        :

        null

      }





    </div>

  );

}


export default StreakCard;