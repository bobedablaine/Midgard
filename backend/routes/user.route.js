import { Router } from "express"
//import User from "../model/user"
import { getUserData, signup } from "../controller/user.controller.js"

const userRoute = Router()

userRoute.get("/get-user/:id", getUserData)
userRoute.post("/signup", signup)

export default userRoute