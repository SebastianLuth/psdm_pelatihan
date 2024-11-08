import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import cookie from "js-cookie";
  
  export type UserData = {
    id: number;
    username: number;
    nama: string;
    nomor_hp: string;
    unit_kerja: string;
    jabatan: string;
    level: number;
    role: string;
    biaya_pelatihan_user: number;
    refreshToken: string;
  };
  
  type AuthContextType = {
    userData: UserData | null;
    setUserData: (userData: UserData | null) => void;
    login: (username: number, password: string) => void;
    logout: () => void;
    errorMessage: string | null;
    isError: boolean;
    isLoading: boolean;
  };
  
  const AuthContext = createContext<AuthContextType>({
    userData: null,
    setUserData: () => {},
    login: () => {},
    logout: () => {},
    errorMessage: null,
    isError: false,
    isLoading: false,
  });
  
  const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const refreshAccessToken = async () => {
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
  
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
    
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    const login = async (username: number, password: string) => {
      setIsLoading(true);
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
          fetchUserData();
          window.location.href = "/";
        } else {
          const data = await response.json();
          setErrorMessage(data.message || "Failed to login");
          setIsError(true);
        }
      } catch (error) {
        setErrorMessage("Failed to login");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
  
    const logout = async () => {
      setIsLoading(true);
      try {
        await fetch(`${baseUrl}/api/auth/signout`, { method: "POST", credentials: "include" });
        cookie.remove("accessToken");
        cookie.remove("refreshToken");
        setUserData(null);
        window.location.href = "/auth/signin";
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUserData();
      const interval = setInterval(() => {
        refreshAccessToken();
      }, 10 * 60 * 1000); 
      return () => clearInterval(interval);
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          userData,
          setUserData,
          login,
          logout,
          errorMessage,
          isError,
          isLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  const useAuth = () => useContext(AuthContext);
  
  export { AuthProvider, useAuth };
  