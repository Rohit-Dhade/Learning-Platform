import { useContext, useEffect } from "react";
import { login, register, logoutController } from "../services/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading } = context;

  const handlelogin = async (email, password) => {
    setloading(true);
    const data = await login(email, password);
    setuser(data);
    setloading(false);
  };

  const handleregister = async (name, email, password) => {
    setloading(true);
    const data = await register(name, email, password);
    setuser(data);
    setloading(false);
  };

  const handlelogout = async () =>{
    setloading(true);
    const mess = await logoutController();
    setuser(null);
    setloading(false)
  }

  return { handlelogin, handleregister, loading, user ,handlelogout};
};
