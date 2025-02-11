import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  let idleTimeout: NodeJS.Timeout | null = null;

  const resetIdleTimer = () =>{
    if (idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      console.warn("User Inactive, Logging Out");
      logout();
    }, 15 * 60 * 1000);
  }

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
      await logout();
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
      await logout();
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
      router.push("/");  
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

    // Reset Timer when there are activities
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    })

    //Interval for refresh the token
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000);

    resetIdleTimer();

    return () => {
      clearInterval(interval);
      events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
      if (idleTimeout) clearTimeout(idleTimeout);
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
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