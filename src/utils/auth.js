import { jwtDecode } from 'jwt-decode';

export const verifyToken = (token, userType) => {
    if (!token) {
        return { valid: false, error: "No token provided" };
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            return { valid: false, error: "Token has expired" };
        }

        if (decodedToken.user_data.userType !== userType) {
            return { valid: true, error: "Wrong User" };
        }
        return { valid: true, decodedToken };
    } catch (error) {
        return { valid: false, error: "Invalid token" };
    }
};
