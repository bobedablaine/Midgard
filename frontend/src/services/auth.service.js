import axios from 'axios';

const AuthService = {
    logout: async () => {
        try {
            // Clear all auth-related data
            localStorage.clear();

            // Optional: Notify the backend about the logout
            const token = localStorage.getItem('token');
            if (token) {
                await axios.post('/user/logout', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    getUsername: () => {
        return localStorage.getItem('username');
    }
};

export default AuthService;