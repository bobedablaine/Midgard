import { getUserByEmail, createNewUser } from "../services/user.service.js"

export const getUserData = async (req, res) => {
    try {
        const email = req.params.id
        const user = await getUserByEmail(email)
        res.status(200).json({ user })
    } catch (err) {
        console.log(err)
    }
}

export const signup = async (req, res) => {
    try {
        const user = req.body
        await createNewUser(user)
        res.status(200).json({"status": "User Created Successfully"})
    } catch(err) {
        console.log(err)
    }
}