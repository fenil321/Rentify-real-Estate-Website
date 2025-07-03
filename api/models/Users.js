import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    username : { 
        type : String,
        required : true,
        unique : true
    },
    email : { 
        type : String,
        required : true,
        unique : true
    },
    img : { 
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : false,
    },
    password: {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : false
    },
    desc: {
        type : String,
        required : false
    },
    isOwner : {
        type : Boolean,
        default : false,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    }
},
{timestamps:true}
);

export default mongoose.model("Users", UserSchema);