import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    city: "",
    isOwner: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isOwner: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate()){}
    else{
      try {
        const res = await axios.post("/auth/validate",user.username,user.email,{withCredentials:true});
      } catch (err) {
        console.log(err.response.data);
        toast.error(err.response.data.message);
      // }
  }
    }
      
    const url = await upload(file);
    try {
      await axios.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const validate = ()=>{
    let result = true
    if(user.username==="" || user.username===null){
    result=false
    toast.warning("Please Enter Username")
    }
    if(user.password==="" || user.password===null){
      result=false
      toast.warning("Please Enter Password")
      }
      if(user.email==="" || user.email===null){
        result=false
        toast.warning("Please Enter Email Id")
        }
          if(user.city==="" || user.city===null){
            result=false
            toast.warning("Please Enter City")
            }
  }
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />
          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="">City</label>
          <input
            name="city"
            type="text"
            placeholder="Surat"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a Owner</h1>
          <div className="toggle">
            <label htmlFor="">Activate the Owner account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
            </label>
          </div>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
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

export default Register;
