import axiosInstance from "../api/axiosInstance";

export const logAllowedOrigins = async () => {
  try {
    // Replace 'your_secure_debug_token' with the actual token set in your server's .env.production
    const response = await axiosInstance.get("/debug/cors_origins", {
      params: {
        debug_token: import.meta.env.VITE_DEBUG_TOKEN, // Set this in your client .env.production
      },
    });
    console.log("Allowed Origins:", response.data.allowed_origins);
  } catch (error) {
    console.error("Failed to fetch allowed origins:", error);
  }
};
