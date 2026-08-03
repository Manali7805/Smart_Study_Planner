import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {


  const { login } = useContext(AuthContext);

  const navigate = useNavigate();



  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");




  const handleLogin = (e) => {

    e.preventDefault();



    const success = login(email, password);



    if (success) {

      navigate("/dashboard");

    } 
    
    else {

      setError("Invalid Email or Password");

    }

  };




  return (
    <div className="login-container">


      <div className="login-box">


        <h1>
          📚 AI Smart Study Planner
        </h1>



        <p>
          Your Personal AI Learning Assistant
        </p>




        <form onSubmit={handleLogin}>


          <input

            type="email"

            placeholder="Enter your Email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

            required

          />




          <input

            type="password"

            placeholder="Enter your Password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

            required

          />




          <button type="submit">

            Login

          </button>



        </form>




        {
          error && (

            <p style={{color:"red", marginTop:"15px"}}>

              {error}

            </p>

          )
        }





        <div className="login-links">


          <a href="#">

            Forgot Password?

          </a>




          <p>

            Don't have an account?


            <a href="/register">

              {" "}Register

            </a>


          </p>



        </div>




      </div>


    </div>
  );
}


export default Login;