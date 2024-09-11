import { jwtDecode } from 'jwt-decode';

export const verifyToken = (token, userType) => {
    if (!token) {
        return { valid: false, error: "No token provided" };
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            return { valid: false, decodedToken, error: "Token has expired" };
        }

        if (decodedToken.user_data.userType !== userType) {
            return { valid: true, decodedToken, error: "Wrong User" };
        }
        return { valid: true, decodedToken, error: null };
    } catch (error) {
        return { valid: false, decodedToken, error: "Invalid token" };
    }
};
