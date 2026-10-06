import { createContext  } from "react";
import { useContext, useState ,useCallback} from "react";
import { toast } from "react-hot-toast";
import api from "../utils/api.js";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
const errmessage = (error, fallback) => error.response?.data?.message || fallback ;
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const refreshUser = useCallback(async () => {
        try {
            const { data } = await api.get("/api/auth/me")
            setUser(data.user)
            return data.user;
        } catch (error) {
            setUser(null)
            return null;
        }
    }, []);

    useEffect(() => {
        refreshUser().finally(() => setLoading(false));
    },[refreshUser]);
    const AuthAction =async (requestFn,successmsg,errorfallback)=>{
        try{
const { data }= await requestFn();
  setUser(data.user)
  if(successmsg) toast.success(successmsg)
    return true;
        }
        catch(error){
toast .error(errmessage(error, errorfallback))
return false;
        }
    }

    const login =(email,password)=>{
        return AuthAction(()=>api.post("/api/auth/login",{email,password}),"Login Success","Login Failed")
    }

     const register =(name,email,password)=>{
        return AuthAction(()=>api.post("/api/auth/register",{name,email,password}),"Registration Success","Registration Failed")
    }

    const logout =async()=>{
        try{
            await api.post("/api/auth/logout")
            setUser(null)
        }
        catch(error){
            toast.error(errmessage(error, "Logout Failed"))
        }
    }

    const value = { user, setUser, login, register, logout ,loading,isAuthenticated:!!user} 
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useApp=()=> useContext(AppContext)