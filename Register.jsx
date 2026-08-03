import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Register() {


  const { register } = useContext(AuthContext);

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: "",
    confirmPassword: ""

  });



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };



  const handleRegister = (e) => {

    e.preventDefault();



    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match");

      return;

    }



    const userData = {

      name: formData.name,

      email: formData.email,

      password: formData.password

    };



    register(userData);



    alert("Registration Successful! Please Login");



    navigate("/login");

  };



  return (
    <div className="login-container">


      <div className="login-box">


        <h1>
          🚀 Create Account
        </h1>



        <p>
          Join AI Smart Study Planner
        </p>



        <form onSubmit={handleRegister}>


          <input

            type="text"

            name="name"

            placeholder="Enter your Name"

            value={formData.name}

            onChange={handleChange}

            required

          />



          <input

            type="email"

            name="email"

            placeholder="Enter your Email"

            value={formData.email}

            onChange={handleChange}

            required

          />



          <input

            type="password"

            name="password"

            placeholder="Create Password"

            value={formData.password}

            onChange={handleChange}

            required

          />



          <input

            type="password"

            name="confirmPassword"

            placeholder="Confirm Password"

            value={formData.confirmPassword}

            onChange={handleChange}

            required

          />



          <button type="submit">

            Register

          </button>



        </form>




        <div className="login-links">


          <p>

            Already have an account?


            <a href="/login">

              {" "}Login

            </a>


          </p>


        </div>



      </div>


    </div>
  );
}


export default Register;