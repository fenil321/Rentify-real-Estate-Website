import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new mongoose.Schema({
    houseId : { 
        type : String,
        required : true,
    },
    userId : { 
        type : String,
        required : true,
    },
    star : { 
        type : Number,
        required : false,
        enum:[1,2,3,4,5]
    },
    desc: {
        type : String,
        required : true
    },
},
{timestamps:true}
);

export default mongoose.model("Review", ReviewSchema);