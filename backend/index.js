import express from "express"
import { mongoose } from "mongoose"
//import User from "./model/user.js"
import dotenv from "dotenv";//imports secret key for use in login from .env file
import userRoute from "./routes/user.route.js"

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", userRoute); //creating a route for user related functions

const mongoConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017");

        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
};

mongoConnect();