import { useEffect, useState } from "react";
import { getAchievements } from "../utils/achievements";
import "../styles/AchievementCard.css";


function AchievementCard() {


  const [achievements,setAchievements] = useState([]);



  useEffect(()=>{


    setAchievements(
      getAchievements()
    );


  },[]);




  return (

    <div className="achievement-card">


      <h2>
         My Achievements
      </h2>



      {

        achievements.length === 0

        ?

        <p>
          Complete quizzes to unlock badges 
        </p>


        :


        achievements.map((item,index)=>(


          <div 
            className="achievement-item"
            key={index}
          >


            <span>
              {item.icon}
            </span>


            <p>
              {item.title}
            </p>


            <span>
              ✅
            </span>


          </div>


        ))

      }


    </div>

  );

}


export default AchievementCard;