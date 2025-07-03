import React, { useState } from 'react'
import  "./HouseListingForm.css"
import axios from "axios";
axios.defaults.baseURL='http://localhost:8000/api';
function HouseListingForm() {
    const [price,setPrice] = useState(0);
    const [city,setCity] = useState("");
    const [numofBedRooms,setnumofBedrooms] = useState(1);
    const [numofBathRooms,setnumofBathrooms] = useState(1);
    const [numofGarages,setGarages] = useState(1);
    const [house_Image,sethouseImage] = useState(null);
    const [name,setName] = useState("Nothing");
    const [type,setType] = useState("Nothing");
    const [adress,setadress] = useState("Nothing");
    const [distance,setDistance] = useState("Nothing");
    const [title,setTitle] = useState("Nothing");
    const [BHK,setBhk] = useState("Nothing");
    const [disc,setDisc] = useState("Nothing");


    const listProperty=()=>{
      const url="/house-listing-form";
      const data = new FormData();
         data.append("city",city);
         data.append("price",price);
         data.append("numofBedRooms",numofBedRooms);
         data.append("numofBathRooms",numofBathRooms);
         data.append("numofGarages",numofGarages);
         data.append("house_Image",house_Image);
         data.append("name",name);
         data.append("type",type);
         data.append("title",title);
         data.append("BHK",BHK);
         data.append("adress",adress);
         data.append("disc",disc);
         data.append("distance",distance);
         axios.post("/house-listing-form",data).then(response=>{
           return console.log(response.data);
          }).catch((error) => console.log(error));
    }
  return (
    <div> 
        <div className="Houselisting_Container">
            <div className="Form">
                <h3>LIST YOUR PROPERTY</h3>
                <label>House Price</label>
                <input type="number" placeholder='House Price' onChange={(e)=>setPrice(e.target.value)} value={price}/>
                <label>House Location</label>
                <input type="text" placeholder='House Location' onChange={(e)=>setCity(e.target.value)} value={city}/>
                <label>No.of Bad Rooms</label>
                <input type="number" placeholder='No.of Bed Rooms' onChange={(e)=>setnumofBedrooms(e.target.value)} value={numofBedRooms}/>
                <label>No. of BathRooms</label>
                <input type="number" placeholder='No.of Bath Rooms' onChange={(e)=>setnumofBathrooms(e.target.value)} value={numofBathRooms}/>
                <label>No. of Parking Lot</label>
                <input type="number" placeholder='No.of Parking Lot' onChange={(e)=>setGarages(e.target.value)} value={numofGarages}/>
                <label htmlFor="">Upload House Images</label>
                <input type="file"  onChange={(e)=>sethouseImage(e.target.files)}/>
                <button onClick={listProperty}>Set Property</button>
            </div>
        </div>
    </div>
  )
}

export default HouseListingForm