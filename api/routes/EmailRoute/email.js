import express, { request, response } from "express";
import formidable from "formidable";
import dotenv from "dotenv"
import nodemailer from "nodemailer"
 const router = express.Router();

 dotenv.config();

 router.post("/api/email",(request,response)=>{
    const transporter = nodemailer.createTransport({
        service:"SendinBlue",
        auth:{
            user:process.env.sendinBlue_email,
            pass:process.env.sendinBlue_key
        }
    })

    const form = new formidable.IncomingForm();

    form.parse(request,(error,fields,files)=>{
        const {message,subject,email,toemail} = fields;
        const mailOptions={
            from:email,
            to:toemail,
            subject,
            html:`
            <h1> MESSAGE </h1>
            <h3> ${message} </h3>

            `
        }
        transporter.sendMail(mailOptions,(error)=>{
            if(error){
                return console.log(error);
            }
            const responseMailOptions={
                from:toemail,
                to:email,
                subject:'Confirmation of recieved Email',
                html:`
                <h1> Confirmation of Recieved Email Message </h1>
                <h3> Please do not respond to this email </h3>
                <h3> THis is an Automated Email </h3>
    
                `
            }
            transporter.sendMail(responseMailOptions,(error)=>{
                if(error){
                    return console.log(error);
                }
                return response.status(200).json({msg:'MESSAGES HAVE BEEN DELIVERED'})
            })
        })
    })
 })

 export default router;