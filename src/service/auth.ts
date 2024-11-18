import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getDataUserAuth = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/auth/me`, {
      withCredentials: true,
    });

    if (data.status === "success") {
      return data.data;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const refreshTokenAuth = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/refreshToken`, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      console.log("Access token refreshed successfully");
    } else {
      console.error("Failed to refresh access token");
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
  }
};

export const loginAuth = async (username: number, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (response.ok) {
      console.log("Login successful");
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error Login user data:", error);
  }
};

export const logoutAuth = async () => {
  try {
    await fetch(`${baseUrl}/api/auth/signout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error Logout user data:", error);
  }
};
