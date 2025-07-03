import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     if(validate()){}
     else{
    try {
      const res = await axios.post("/auth/login", { username, password },{withCredentials:true});
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/")
      toast.success("User has been Login Successfully")
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data.message);
    // }
  }
     }
  };

   const validate = ()=>{
     let result = true
     if(username==="" || username===null){
     result=false
     toast.warning("Please Enter Username")
     }
     if(password==="" || password===null){
       result=false
       toast.warning("Please Enter Password")
       }
   }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label>Username</label>
        <input
          name="username"
          type="text"
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to={`/register`}>SignUp for Free</Link>
        {error && error}
      </form>
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  );
}

export default Login;
