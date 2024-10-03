import express from "express"
import { mongoose } from "mongoose"
//import User from "./model/user.js"
import userRoute from "./routes/user.route.js"

const app = express()


app.use(express.json())
app.use("/user", userRoute) //creating a route for user related functions



const mongoConnect = async () => {
    await mongoose.connect("mongodb://localhost:27017")
    console.log('DB connected')
}

mongoConnect()

app.listen(3000, () => console.log('server started on port 3000'))