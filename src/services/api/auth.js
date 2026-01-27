// src/api/userService.js
import api from './../axiosConfig'; // Import your configured Axios instance

// Base path for user-related endpoints


const AuthService = {
    loginUser: async (loginData) => {
        try {
            const response = await api.post(`/login`, loginData);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
    signUpUser: async (signUpData) => {
        try {
            const response = await api.post(`/register`, signUpData);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error signing up user:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
    // verifyOtp: async (otpData) => {
    //     try {
    //         const response = await api.post(`/verify-otp`, otpData);
    //         return response.data; // Axios puts the actual data in .data
    //     } catch (error) {
    //         console.error('Error verifying OTP:', error);
    //         throw error; // Re-throw the error to be handled by the calling component
    //     }
    // },
    googleLogin: async (googleData) => {
        try {
            const response = await api.post(`/google-login`, googleData);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
    forgotPassword: async (email) => {
        try {
            const response = await api.post(`/forgot-password`, { email });
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
    resetPassword: async (resetData) => {
        try {
            const response = await api.post(`/reset-password`, resetData);
            return response.data; // Axios puts the actual data in .data
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error; // Re-throw the error to be handled by the calling component
        }
    },
    uploadProfilePicture: async (base64Image) => {
        try {
            // The endpoint is now under 'auth/'
            // We send a JSON object, so the default 'application/json' header is used.
            const response = await api.post(`/upload-profile-picture`, { profilePicture: base64Image });
            return response.data;
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            throw error;
        }
    },
    updateProfile: async (profileData) => {
        try {
            const response = await api.put(`/update-profile`, profileData);
            return response.data;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },
    getCurrentUser: async () => {
        try {
            const response = await api.get(`/me`);
            return response.data;
        } catch (error) {
            console.error('Error fetching current user:', error);
            throw error;
        }
    },
    getUserById: async (userId) => {
        try {
            const response = await api.get(`/user/${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching user by ID ${userId}:`, error);
            throw error;
        }
    },
    /**
     * Fetches all users.
     * @returns {Promise<Array>} A promise that resolves to an array of user objects.
     */

};

export default AuthService;