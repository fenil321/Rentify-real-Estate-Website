import Houses from "../models/Houses.js";
import { createError } from "../utils/error.js";
export const createHouse = async(req,res,next)=>{
    
    const newHouse = new Houses({
        userId: req.user.id,
        ...req.body,}
        );
    try{
        const saveHouse = await newHouse.save();
        res.status(200).json(saveHouse); 
    }catch(err){
         next(err);
    }
 }

 export const updateHouse = async(req,res,next)=>{
    
    try{
        const updatedHouse = await  Houses.findByIdAndUpdate(req.params.id,{ $set : req.body }, {new :true} );
        res.status(200).json(updatedHouse); 
    }catch(err){
         next(err);
    }
 }

 export const deleteHouse = async(req,res,next)=>{
    
    try{
        const home = await Houses.findById(req.params.id);

        if(home.userId != req.user.id)
                return next(createError(403,"You can delete only your House!"));

        await  Houses.findByIdAndDelete(req.params.id);
        res.status(200).json("House has been deleted"); 
    }catch(err){
         next(err);
    }
 }

 export const getHouse = async(req,res,next)=>{
    
    try{
        const house = await  Houses.findById(req.params.id);
        res.status(200).json(house); 
    }catch(err){
         next(err);
    }
 }

 export const getHouses = async(req,res,next)=>{
    
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.type && { type: q.type }),
    ...(q.featured && { featured: q.featured }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { city: { $regex: q.search, $options: "i" } }),
  };
    try{
        const houses = await  Houses.find(filters).sort({[q.sort] : -1});
        res.status(200).json(houses); 
    }catch(err){
         next(err);
    }
 }

 export const featuredHouse = async(req,res,next)=>{
      try{
          const houses = await  Houses.find(req.query);
          res.status(200).json(houses); 
      }catch(err){
           next(err);
      }
   }

 export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Houses.countDocuments({city:city})
        }))
        res.status(200).json(list); 
    }catch(err){
         next(err);
    }
 }

 export const countByType = async(req,res,next)=>{
    try{
        const houseCount = await Houses.countDocuments({type:"familyHouse"})
        const villaCount = await Houses.countDocuments({type:"houseVilla"})
        const apartmentCount = await Houses.countDocuments({type:"Apartment"})
        const officeCount = await Houses.countDocuments({type:"Office"})
        const condoCount = await Houses.countDocuments({type:"Condo"})

        res.status(200).json( [
                {type:"familyHouse",count:houseCount},
                {type:"houseVilla",count:villaCount},
                {type:"Apartment",count:apartmentCount},
                {type:"Office",count:officeCount},
                {type:"Condo",count:condoCount},
        ]); 
    }catch(err){
         next(err);
    }
 }