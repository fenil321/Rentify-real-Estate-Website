import mongoose from 'mongoose';
const { Schema } = mongoose;

const HouseSchema = new mongoose.Schema({
    userId : { 
        type : String,
        required : true,
    },
    name : { 
        type : String,
        required : false,
    },
    type : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    adress : {
        type : String,
        required : true
    },
    distance : {
        type : String,
         required : true,
    },
    photos : {
        type : [String],
    },
    desc : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    totalStars : {
        type : Number,
    },
    ratings : {
        type : Number,
        min : 0,
        max : 5
    },
    BHK:{
        type : String,
        required:true,

    },
    price : {
        type : Number,
        required : true,
    },
    featured : {
        type : Boolean,
        default : false,
    },
        numofBedRooms:{
            type:Number ,
            required:false 
        },
        numofBathRooms:{
            type:Number ,
            required:false 
        },
        numofGarages:{
            type:Number ,
            required:false 
        },
        house_Image : {
            type:String,
            required:true
        },
        features: {
            type: [String],
            required: false,
          },
});

export default mongoose.model("Houses", HouseSchema);