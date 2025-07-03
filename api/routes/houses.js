import express from "express";
import { countByCity , countByType , createHouse, deleteHouse, featuredHouse, getHouse, getHouses, updateHouse } from "../controllerss/house.js";
import Houses from "../models/Houses.js"
import { createError } from "../utils/error.js";
import { verifyToken, verifyUser , verifyOwner , verifyAdmin} from "../utils/verifyToken.js";
const router = express.Router();

 //CREATE
 router.post("/", verifyOwner ,createHouse);
 //UPDATE
 router.put("/:id",verifyOwner,updateHouse);
 //DELETE
 router.delete("/:id",verifyOwner, deleteHouse);
 //GET
 router.get("/find/:id",getHouse);
 //GETALL
 router.get("/",getHouses);
 router.get("/feature",featuredHouse);
 router.get("/house-rent",getHouses);
 router.get("/countByCity", countByCity);
 router.get("/countByType", countByType);
export default router;