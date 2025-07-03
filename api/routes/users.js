import express from "express";
import { updateUser , deleteUser , getUser , getUsers } from "../controllerss/users.js";
import { verifyToken, verifyUser , verifyOwner , verifyAdmin} from "../utils/verifyToken.js";
const router = express.Router();

router.get("/checkauth",verifyToken,(req,res,next)=>{
res.send("Hello user you are logged in");
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("Hello user you are logged in and you can delete your account");
    })

router.get("/checkowner/:id",verifyOwner,(req,res,next)=>{
        res.send("Hello Owner you are logged in and you can delete your account");
        })    
router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
            res.send("Hello Admin you are logged in and you can delete all accounts");
            })       
 //UPDATE
 router.put("/:id",verifyUser,updateUser);
 router.put("/:id",verifyOwner,updateUser);
 //DELETE
 router.delete("/:id",verifyUser,deleteUser);
 router.delete("/:id",verifyOwner,deleteUser);
 //GET
 router.get("/:id",verifyUser,getUser);
 router.get("/:id",verifyOwner,getUser);
 router.get("/single/:id",getUser);
 //GETALL
 router.get("/",verifyAdmin,getUsers);

export default router