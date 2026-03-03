import { createContext, useState, useEffect } from "react";
import { getme } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  // const [CurrentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getme();
        setuser(data);
      } catch {
        setuser(null);
      } finally {
        setloading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setuser, loading, setloading }}>
      {children}
    </AuthContext.Provider>
  );
};
