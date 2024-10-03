import User from "../model/user.js"

export const getUserByEmail = async (email) => {
    const user = await User.find({email})
    return user
}

export const createNewUser = async (userData) => {
    await User.create(userData)
}