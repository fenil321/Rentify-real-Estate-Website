import mongoose from 'mongoose';
const { Schema } = mongoose;

const ConversationSchema = new mongoose.Schema({
    id : { 
        type : String,
        required : true,
        unique : true,
    },
    ownerId : { 
        type : String,
        required : true,
    },
    tenantId : { 
        type : String,
        required : true,
    },
    readByOwner : { 
        type : Boolean,
        required : true,
    },
    readByTenant : { 
        type : Boolean,
        required : true,
    },
    lastMessage : { 
        type : String,
        required : false,
    },
},
{timestamps:true}
);

export default mongoose.model("Conversation", ConversationSchema);