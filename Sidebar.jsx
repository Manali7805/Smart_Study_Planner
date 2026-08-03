import { NavLink } from "react-router-dom";


function Sidebar() {

  return (

    <div className="sidebar">


      <div className="logo">
         AI Planner
      </div>



      <ul>


        <li>
          <NavLink to="/dashboard">
             Dashboard
          </NavLink>
        </li>



        <li>
          <NavLink to="/study-planner">
             Study Planner
          </NavLink>
        </li>



        <li>
          <NavLink to="/notes">
             Notes
          </NavLink>
        </li>



        <li>
          <NavLink to="/quiz">
             AI Quiz
          </NavLink>
        </li>



        <li>
          <NavLink to="/progress">
             Progress
          </NavLink>
        </li>



        <li>
          <NavLink to="/profile">
             Profile
          </NavLink>
        </li>


      </ul>


    </div>

  );
}


export default Sidebar;