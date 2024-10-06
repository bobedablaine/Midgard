import { Router } from "express"
//import User from "../model/user"
import { getUserData, signup } from "../controller/user.controller.js"
import { registerController } from "../controller/register.controller.js"
import loginController from "../controller/login.controller.js"; // Correct import

const userRoute = Router()

userRoute.post("/register", (req, res, next) => {
    console.log("POST /register route hit");
    next();
}, registerController);
userRoute.post("/login", (req, res, next) => {
    console.log("POST /login route hit");
    next();
}, loginController);
userRoute.get("/get-user/:id", getUserData)
userRoute.post("/signup", signup)

export default userRoute;