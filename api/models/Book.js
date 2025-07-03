import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookSchema = new mongoose.Schema({
    houseId : { 
        type : String,
        required : true,
    },
    img : { 
        type : String,
        required : false,
    },
    title : { 
        type : String,
        required : false,
    },
    price : { 
        type : Number,
        required : false,
    },
    ownerId : { 
        type: String,
      required: true
    },
    tenantId: {
        type : String,
        required : true
    },
    isCompleted : { 
        type : Boolean,
        required : false,
    },
},
{timestamps:true}
);

export default mongoose.model("Book", BookSchema);