import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Email:', email);
        console.log('Password:', password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        console.log('User found:', user);
        console.log('User password:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error); // Log the error details
        res.status(500).json({ message: 'Server error', error });
    }
};

export default loginController;

//vulnerable to sql injection fix later by checking user input