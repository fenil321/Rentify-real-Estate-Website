import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
const { sign , verify } = jwt;
import cookieParser from "cookie-parser";
export const register = async (req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
            username : req.body.username,
            email : req.body.email,
            password : hash,
            img : req.body.img,
            city : req.body.city,
            phone : req.body.phone,
            desc : req.body.desc,
            isOwner : req.body.isOwner,
            isAdmin : req.body.isAdmin
        });
        await newUser.save()
        res.status(200).send("User has been created");
    } catch (err) {
        next(err);
    }
}
export const login = async(req,res,next)=>{
    try {
         const user = await Users.findOne({username:req.body.username});
         if(!user) return next(createError(404,"User not Found"));

         const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
         console.log(isPasswordCorrect);
         if(!isPasswordCorrect) return next(createError(400,"wrong Password or username!"));

         const token =  jwt.sign({id : user._id , isOwner : user.isOwner, isAdmin : user.isAdmin},process.env.JWT);
         const {password , isOwner , isAdmin ,...otherDetails } = user._doc;

         res.cookie("access_token", token ,{
            httpOnly : true,
         }).status(200).json({...otherDetails});
        
    } catch (err) {
        next(err);
    }
}

export const validate = async(req,res,next)=>{
    try {
         const usd = await Users.findOne({username:req.body.username});
         if(usd) return next(createError(404,"Username is already taken"));

          const email = await Users.findOne({email:req.body.email});
          if(email) return next(createError(404,"Email Id is already registerd"));
         res.send("Username must be Unique")
    } catch (err) {
        next(err);
    }
}

export const logout = async (req,res) =>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true,
    }).status(200).
    send("User has been logged out.");
}