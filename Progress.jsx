import { useEffect, useState } from "react";
import "../styles/Progress.css";


function Progress() {


  const [progressData, setProgressData] = useState([]);




  useEffect(()=>{


    const savedProgress = JSON.parse(

      localStorage.getItem("quizProgress")

    ) || [];


    setProgressData(savedProgress);


  },[]);







  const totalQuizzes = progressData.length;





  const averageScore = progressData.length > 0

  ?

  Math.round(

    progressData.reduce(

      (total,item)=> total + item.percentage,

      0

    ) / progressData.length

  )

  :

  0;







  const weakTopics = progressData.filter(

    item => item.percentage < 60

  );




  const strongTopics = progressData.filter(

    item => item.percentage >= 80

  );







  const getRecommendation = ()=>{


    if(weakTopics.length > 0){


      return (

        `Focus more on ${
          weakTopics[0].topic
        }. Revise concepts and practice more questions.`

      );


    }


    else if(averageScore >= 80){


      return (

        "Excellent performance! Try advanced difficulty quizzes."

      );


    }


    else{


      return (

        "Keep practicing regularly to improve your score."

      );


    }


  };









  return (

    <div className="progress-page">



      <h1>
        📈 My Learning Progress
      </h1>


      <p>
        Track your AI-powered learning journey
      </p>







      <div className="progress-summary">



        <div className="progress-card">

          <h2>
            {totalQuizzes}
          </h2>

          <p>
            Total Quizzes
          </p>

        </div>






        <div className="progress-card">

          <h2>
            {averageScore}%
          </h2>

          <p>
            Average Score
          </p>

        </div>






        <div className="progress-card">

          <h2>
            🤖 AI Analysis
          </h2>

          <p>
            Smart Feedback
          </p>

        </div>



      </div>









      <div className="recommendation-card">


        <h2>
          🧠 AI Study Recommendation
        </h2>


        <p>
          {getRecommendation()}
        </p>


      </div>









      <div className="topic-analysis">



        <div className="analysis-box">


          <h2>
            ❌ Weak Topics
          </h2>



          {

          weakTopics.length === 0

          ?

          <p>
            No weak topics 🎉
          </p>


          :

          weakTopics.map((item,index)=>(

            <p key={index}>

              {item.topic} - {item.percentage}%

            </p>

          ))

          }



        </div>









        <div className="analysis-box">


          <h2>
            ✅ Strong Topics
          </h2>




          {

          strongTopics.length === 0

          ?

          <p>
            Keep improving 🚀
          </p>


          :

          strongTopics.map((item,index)=>(

            <p key={index}>

              {item.topic} - {item.percentage}%

            </p>

          ))

          }



        </div>



      </div>









      <div className="subject-progress">


        <h2>
          Quiz History
        </h2>





        {

        progressData.length === 0

        ?

        (

        <div className="subject-card">

          <h3>
            No Quiz Attempted Yet 🚀
          </h3>

        </div>

        )

        :


        progressData.map((item,index)=>(


          <div

          className="subject-card"

          key={index}

          >



            <div className="subject-header">


              <h3>
                📚 {item.topic}
              </h3>


              <span>
                {item.percentage}%
              </span>


            </div>





            <div className="progress-bar">


              <div

              className="progress-fill"

              style={{

                width:`${item.percentage}%`

              }}

              >

              </div>


            </div>





            <p>
              🎯 Score: {item.score}/{item.total}
            </p>


            <p>
              ⭐ Difficulty: {item.difficulty}
            </p>


            <p>
              📅 Date: {item.date}
            </p>



          </div>


        ))

        }



      </div>







    </div>

  );

}


export default Progress;