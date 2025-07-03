import "./reserve.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot} from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import axios from "axios";
import useFetch from '../hooks/useFetch';
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
function Reserve({setOpen}) {
  const [email,setEmail]=useState("");
  const [subject,setSubject]=useState("");
  const [message,setMessage]=useState("");
  const location = useLocation();
    const id = location.pathname.split("/")[2];

    const {data,loading,error} = useFetch(`/houses/find/${id}`);
    const userId = data?.userId;

    const {
      isLoading: isLoadingUser,
      error: errorUser,
      data: dataUser,
    } = useQuery({
      queryKey: ["user7"],
      queryFn: () =>
        axios.get(`/users/single/${userId}`).then((res) => {
          return res.data;
        }),
      enabled: !!userId,
    });

    const sendMessage=(e)=>{
      e.preventDefault();
      const url = "http://localhost:8000/api/email"
      const toemail = dataUser?.email

      const data = new FormData();
      data.append("email",email)
      data.append("subject",subject)
      data.append("message",message)
      data.append("toemail",toemail)

      axios.post(url,data).then(response=>{
        alert(response.data.msg);
        window.location.reload(false);
      }).catch((error)=>{
        return console.log(error);
      })
      console.log("Email:",email);
      console.log("Subject:",subject);
      console.log("Message:",message);
      console.log("toemail:",toemail);
    }

  return (
    <div><div className="Housedesc_rightcontainer">
    <div className='rcontainer'>
    <FontAwesomeIcon icon={faCircleXmark} className="rclose" onClick={()=>setOpen(false)}/>
    <form onSubmit={sendMessage}>
      <h3>Contact Owner</h3>
       <label htmlFor="" >Email</label>
       <input type="email" className='remail' placeholder='Enter a valid Email' name="" id="" onChange={(e)=>setEmail(e.target.value)}/>
       <label htmlFor="">Subject</label>
       <input type="text" className="rsub" placeholder='Enter the subject of the Message' name="" id="" onChange={(e)=>setSubject(e.target.value)}/>
       <label htmlFor="">Message</label><br></br>
       <textarea name="" id="" className='rdesc' placeholder='Enter in Your Message' cols="60" rows="10" onChange={(e)=>setMessage(e.target.value)}></textarea>
       <br></br>
       <button className="rbutton">SEND MESSAGE</button>
    </form>
    </div>
</div></div>

  )
}

export default Reserve



