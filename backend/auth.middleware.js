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
    console.log("token:", token);

    if (!token) {
        return res.status(403).json({ error: 'Token is required' });
    }

    try {
        // Remove 'Bearer ' prefix and then verify (not decode)
        const actualToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(actualToken, process.env.SECRET_KEY);  // Changed from jwt.decode to jwt.verify
        console.log("decoded:", decoded);

        if (!decoded) {
            return res.status(403).json({ error: 'Failed to decode token' });
        }

        const userId = decoded.userId;
        const user = await getUserByToken(userId);
        res.json({userData: user});
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: 'Token verification failed' });
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
