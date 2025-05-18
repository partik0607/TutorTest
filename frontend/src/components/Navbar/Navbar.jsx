import React from 'react'
import './Navbar.css';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { quizcontext } from '../../context/Quiz-context';
// import {logo} from './Assets/logo.jpg';
function Navbar() {
    const Student=useContext(quizcontext).Student;
    // console.log(Student);
  return (
        <div className="nav">
        <div className="nav-logo-container">
          <div className="nav-logo">
              <p className="nav-logo">TutorTest</p>
            </div>
      </div>
      <ul  className="nav-menu">
        {Student=="True"?<></>:<li><Link to='/Home' className="no-underline">HOME</Link></li>}
        {Student=="True"?<></>:<li><Link to='/create-quiz'className="no-underline">Create</Link></li>}
        {Student=="True"?<></>:<li><Link to='/prev-quiz'className="no-underline">Ongoing</Link></li>}
        {Student=="True"?<></>:<li><Link to='/upcomming-quiz'className="no-underline">Upcoming</Link></li>}
        {Student=="True"?<></>:<li><Link to='/allquiz' className="no-underline">All</Link></li>}
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{
          localStorage.removeItem('auth-token');
          localStorage.removeItem('usertype');
          localStorage.removeItem('user-id');
          localStorage.removeItem('user-username');
          localStorage.removeItem('user-email');
          window.location.replace("/");
        }}>Logout</button>
        :<Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
      </div>
        </div>

  )
}

export default Navbar