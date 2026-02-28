import { useContext } from "react";
import {login , register} from '../services/auth.api'
import { AuthContext } from "../auth.context";

export const useAuth = ()=>{
    const context = useContext(AuthContext);
    const {user , setuser , loading , setloading} = context;

    const handlelogin = async(email , password)=>{
        setloading(true);
        const data = await login(email , password);
        setuser(data);
        setloading(false);
    }

    const handleregister = async(name , email , password)=>{
        setloading(true);
        const data = await register(name , email , password);
        setuser(data);
        setloading(false);
    }

    return (
        {handlelogin , handleregister ,loading, user}
    )
}
