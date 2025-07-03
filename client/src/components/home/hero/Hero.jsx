import React, { useState } from "react"
import Heading from "../../common/Heading"
import { useNavigate } from "react-router-dom"
import "./hero.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hero = () => {
  const navigate = useNavigate();
  const [destination,setDestination] = useState("");
  const [proptype,setProptype] = useState("");
  const [price,setPrice] = useState("");


  const handleSearch = ()=>{
    if(validate()){}
    else{
    navigate("/houses",{state:{ destination , proptype , price}});
    }
};

const validate = ()=>{
  let result = true
  if(destination==="" || destination===null){
  result=false
  toast.warning("Please Enter destination")
  }
}

  return (
    <>
      <section className='hero'>
        <div className='container'>
          <Heading title='Search All Types of Properties' subtitle='Find new & featured property located in your local city.' />

          <form className='flex'>
            <div className='box'>
              <span>City/Street</span>
              <input type='text' name="city" value={destination} placeholder='Location' onChange={e=>setDestination(e.target.value)}/>
            </div>
            <div className='box'>
              <span>Property Type</span>
              <input type='text' placeholder='Property Type' onChange={e=>setProptype(e.target.value)}/>
            </div>
            <div className='box'>
              <span>Price Range</span>
              <input type='text' placeholder='Price Range' onChange={e=>setPrice(e.target.value)}/>
            </div>
            <div className='box'>
              <h4>Advance Filter</h4>
            </div>
            <button className='btn1' onClick={handleSearch}>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
      <ToastContainer
position="top-center"
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
    </>
  )
}

export default Hero
