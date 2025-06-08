import React, { useState,useEffect } from "react";
import "./LoginSignup.css";
import { useNavigate,useLocation } from "react-router-dom";
const TestLoginSignup = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({username:"",usertype:"",email:"",password:""});

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
    }

    const login = async () => {
      try {
        const response = await fetch('https://tutortest.onrender.com/api/v1/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          // console.log(formData);
        });
    
        const data = await response.json();
        console.log(data);
    
        if (data.success) {
          localStorage.setItem('auth-token', data.token);
          localStorage.setItem('usertype', data.usertype);
          localStorage.setItem('user-id', data._id);
          localStorage.setItem('user-email', data.email);
          localStorage.setItem('user-username', data.username);
          console.log(data);
          //  window.location.href = "/home";
        //   window.location.replace("/Home");
        setState("Login");
        navigate(from, { replace: true });
        } else {
          alert(data.errors || "Login failed");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Something went wrong. Try again!");
      }
    }
    
    const signup = async () => {
      if (!formData.username) {
        alert("Username is required for signup");
        return;
      }
    
      try {
        console.log(formData);
        const response = await fetch('https://tutortest.onrender.com/api/v1/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json();
        console.log(data);
    
        if (data.success) {
          localStorage.setItem('auth-token', data.token);
          localStorage.setItem('usertype', data.usertype);
        localStorage.setItem('user-id', data._id);
        localStorage.setItem('user-email', data.email);
        localStorage.setItem('user-username', data.username);
        //   window.location.replace("/Home");
        //  window.location.href = "/home";

        setState("Sign Up");
        navigate(from, { replace: true });
        } else {
          alert(data.errors || "Signup failed");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        alert("Something went wrong. Try again!");
      }
    };
    
    

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign Up"?<input type="text" placeholder="Your name" name="username" value={formData.username} onChange={changeHandler}/>:<></>}
          {state==="Sign Up"?<input type="text" placeholder="User type" name="usertype" value={formData.usertype} onChange={changeHandler}/>:<></>}
          <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={changeHandler}/>
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler}/>
        </div>

        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

        {state==="Login"?
        <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>
        :<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>}
      </div>
    </div>
  );
};

export default TestLoginSignup;
