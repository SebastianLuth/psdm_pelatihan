import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getDataUserAuth, loginAuth, logoutAuth, refreshTokenAuth } from "@/service/auth";
import { AuthContextType, UserData } from "@/types/auth-type";
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

  const refreshAccessToken = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsError(false);
    try {
      await refreshTokenAuth();
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      setErrorMessage("Failed to refresh access token");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsError(false);
    try {
      const result = await getDataUserAuth();
      if (!result) {
        setUserData(null);
        setIsError(true);
        return;      
      }
      setUserData(result);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUserData(null);
      setErrorMessage("Failed to fetch user data");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: number | undefined, password: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsError(false);
    try {
      const result = await loginAuth(username , password);
      if (!result) {
        setUserData(null);
        setErrorMessage("Failed to login check your username and password");
        setIsError(true);
        return;
      }
      await fetchUserData();
      window.location.href = "/";  
    } catch (error) {
      console.error("Failed to login:", error);
      setErrorMessage("Failed to login");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsError(false);
    try {
      await logoutAuth();
      setUserData(null);
      window.location.href = "/auth/signin";
    } catch (error) {
      console.error("Failed to logout:", error);
      setErrorMessage("Failed to logout");
      setIsError(true);    
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(
      () => {
        refreshAccessToken();
      }, 10 * 60 * 1000,);
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