import express, { application } from "express"
import dotenv from "dotenv"
import mongoose  from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import housesRoute from "./routes/houses.js"
import shopRoute from "./routes/shop.js"
import reviewRoute from "./routes/review.js"
import cookieParser from "cookie-parser"
import houseListingform from "./routes/HouseListing/HouseListing.js"
import emailRouter from "./routes/EmailRoute/email.js"
import orderRoute from "./routes/order.route.js"
import messageRoute from "./routes/message.route.js"
import conversationRoute from "./routes/conversation.route.js"

import cors from "cors";

const app = express();
dotenv.config();


const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MOngodb");
      } 
      catch (error) {
        throw error;
      }
};

mongoose.connection.on("disconnected",()=>{
    console.log("MOngodb Disconnected");
})

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials",true)
    next()
})
app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true
    }
));

app.use(express.json());
app.use(cookieParser());
 
app.use("/api/auth" , authRoute)
app.use("/api/users" , usersRoute)
app.use("/api/houses" , housesRoute)
app.use("/api/house-rent" , housesRoute)
app.use("/api/shop" , shopRoute)
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/message", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use(houseListingform);
app.use(emailRouter)

app.use((err,req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({ 
        success : false,
        status : errorStatus,
        message : errorMessage,
        stack : err.stack,
    });
})

app.listen(8000, () => {
    connect();
    console.log("Connected to Backend");
});