import axios from "axios";

const api = axios.create({
  baseURL: process.env.SERVER_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to refresh the token
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post(
      "/auth/refresh-token", // Your API refresh token endpoint
      { refreshToken },
      {
        baseURL: process.env.SERVER_URL || "http://localhost:8080/api",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Save new tokens to localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token", error);
    throw error;
  }
};

// Response interceptor to handle 401 errors and refresh tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is a 401 Unauthorized, try refreshing the token
    if (error.response && error.response.status === 401) {
      // Prevent infinite loops by checking if the token is already being refreshed
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          const newAccessToken = await refreshAccessToken();

          // Set the new access token in the headers and retry the request
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new access token
          return api(originalRequest);
        } catch (refreshError) {
          // If token refresh fails, clear the tokens and redirect to login page
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // Redirect to login page
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
