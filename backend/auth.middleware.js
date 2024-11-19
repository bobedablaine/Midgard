import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import { getUserByToken } from './services/user.service.js';
//authentication NOT authorization

export const authenticate = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch  (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const getUserFromToken = async (req, res) => {
    const token = req.headers.authorization;
    console.log("token: " + token)
    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }
    try {
        const decoded = await jwt.decode(token, process.env.SECRET_KEY);
        console.log("decoded: " + JSON.stringify(decoded, null, 2))
        const userDecoded = JSON.stringify(decoded, null, 2)
        const parsedUser = JSON.parse(userDecoded)
        const userId = parsedUser.userId;
        const user = await getUserByToken(userId)
        console.log("user: " + user)
        res.json({userData: user});
    } catch (err) {
        console.log(err)
    }
}

// const decodeToken = async (token) => {
//     try {
//         const decodedToken = await jwtDecode(token);
//         return decodeToken;
//     } catch {
//         console.log(err);
//     }
// }
