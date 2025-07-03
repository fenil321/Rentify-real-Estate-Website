import express from "express";
import formidable from "formidable";
import dotenv from "dotenv"
import Houses from "../../models/Houses.js";
 const router = express.Router();
 dotenv.config();
  import { v2 as cloudinary } from 'cloudinary'
 cloudinary.config({
     cloud_name : process.env.CLOUD_NAME,
     api_key : process.env.API_KEY,
     api_secret : process.env.API_SECRET_KEY,
 })

router.post("/api/house-listing-form",(request,response) => {

    const form = new formidable.IncomingForm();

    form.parse(request,(error,fields,files) => {  
        const {
            price,
            city,
            numofBedRooms,
            numofBathRooms,
            numofGarages,
            name,
            title,
            adress,
            BHK,
            type,
            disc,
            distance,
        } = fields;

        const houseimage= files.house_Image.filepath;
         
        cloudinary.uploader.upload(houseimage , {folder:'/houseAgency'},async(error,results)=>{
            if(error){
                return console.log(error);
            }
            const image_url = results.url;
            const newHouse = new Houses({
                   city : city,
                   price : price,
                   numofBedRooms : numofBedRooms,
                   numofBathRooms : numofBathRooms,
                   numofGarages : numofGarages,
                   house_Image : image_url,
                   name: name,
                   type : type,
                   title : title,
                   BHK : BHK,
                   adress : adress,
                   disc : disc,
                   distance : distance,
            })
            const savedHouse = await newHouse.save();
            return response.status(200).json(savedHouse);
        })
    
    })
})

export default router;