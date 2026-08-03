import { useEffect, useState } from "react";
import "../styles/Profile.css";


function Profile() {


  const [stats, setStats] = useState({
    quizzes:0,
    average:0,
    best:0,
    subjects:0
  });



  const [level,setLevel] = useState("Beginner");



  useEffect(()=>{


    const data = JSON.parse(
      localStorage.getItem("quizProgress")
    ) || [];



    if(data.length > 0){


      const totalQuizzes = data.length;



      const averageScore = Math.round(

        data.reduce(
          (sum,item)=>sum + item.percentage,
          0
        )
        /
        data.length

      );



      const bestScore = Math.max(

        ...data.map(
          item=>item.percentage
        )

      );



      const uniqueSubjects = [

        ...new Set(

          data.map(
            item=>item.topic
          )

        )

      ].length;




      setStats({

        quizzes:totalQuizzes,

        average:averageScore,

        best:bestScore,

        subjects:uniqueSubjects

      });





      if(averageScore >= 90){

        setLevel("🏆 Expert Learner");

      }

      else if(averageScore >= 70){

        setLevel("⭐ Advanced Learner");

      }

      else if(averageScore >= 50){

        setLevel("📚 Intermediate Learner");

      }

      else{

        setLevel("🌱 Beginner");

      }


    }



  },[]);





  return (

    <div className="profile-page">


      <h1>
        👤 My Profile
      </h1>


      <p>
        Track your AI-powered learning journey.
      </p>





      <div className="profile-card">


        <div className="profile-avatar">

          👨‍🎓

        </div>



        <div>


          <h2>
            Manali Patil
          </h2>


          <p>
            📧 student@gmail.com
          </p>


          <p>
            🎓 B.Tech Computer Science
          </p>


          <p>
            🏫 PVPIT Budhgaon
          </p>


          <p>
            📖 4th Year
          </p>



        </div>



      </div>






      <h2 className="section-title">

        📊 Learning Statistics

      </h2>





      <div className="stats-container">



        <div className="stat-card">

          <h2>
            ❓
          </h2>

          <h3>
            {stats.quizzes}
          </h3>

          <p>
            Quizzes Completed
          </p>

        </div>





        <div className="stat-card">

          <h2>
            🎯
          </h2>

          <h3>
            {stats.average}%
          </h3>

          <p>
            Average Score
          </p>

        </div>





        <div className="stat-card">

          <h2>
            🏆
          </h2>

          <h3>
            {stats.best}%
          </h3>

          <p>
            Best Score
          </p>

        </div>





        <div className="stat-card">

          <h2>
            📚
          </h2>

          <h3>
            {stats.subjects}
          </h3>

          <p>
            Subjects Learned
          </p>

        </div>




      </div>






      <h2 className="section-title">

         Learning Level

      </h2>




      <div className="achievement-card">

        {level}

      </div>






      <button className="edit-btn">

         Edit Profile

      </button>




    </div>

  );

}


export default Profile;