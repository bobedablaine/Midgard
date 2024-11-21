import express from "express"
import { mongoose } from "mongoose"
//import User from "./model/user.js"
import dotenv from "dotenv";//imports secret key for use in login from .env file
import userRoute from "./routes/user.route.js"
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.json());
app.use("/user", userRoute); //creating a route for user related functions

const mongoConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://tvuser:sO1XLuLvX9ogZ01z@testcluster0.p9xa7.mongodb.net/");

        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};

mongoConnect();