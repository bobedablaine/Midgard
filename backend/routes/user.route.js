import { Router } from "express"
//import User from "../model/user"
import { getUserData, signup } from "../controller/user.controller.js"
import { registerController } from "../controller/register.controller.js"
import loginController from "../controller/login.controller.js"; // Correct import
import { updateProgress, getProgress } from "../controller/progress.controller.js";
// At the top of your user.route.js, add:
import UserProgress from '../model/userProgress.js';


import { getUserFromToken } from "../auth.middleware.js";

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
userRoute.get("/profile", getUserFromToken)
userRoute.post("/progress", getUserFromToken, updateProgress);
userRoute.get("/progress", getUserFromToken, getProgress);
userRoute.post("/logout", (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

export default userRoute;