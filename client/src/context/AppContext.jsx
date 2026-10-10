import { createContext  } from "react";
import { useContext, useState ,useCallback,useEffect} from "react";
import { toast } from "react-hot-toast";
import api from "../config/api.js";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const ROOT_BREACRUMB =[{id:null,name:"My Drive"}]
const errmessage = (error, fallback) => error.response?.data?.message || fallback ;
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

// upload globle state
const [uploading, setUploading] = useState(false)
const [uploadProgress, setUploadProgress] = useState(0)

//Drove veiw state
const [currentFolder, setCurrentFolder] = useState(null)
const [breadcrumbs, setBreadcrumbs] = useState(ROOT_BREACRUMB)
const [files, setFiles] = useState([])
const [folders, setFolders] = useState([])
const [isDriveloading, setIsDriveLoading] = useState(false)

//filter state
const [searchQuery, setSearchQuery] = useState("")
const [sortBy, setSortBy] = useState("name_asc")


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

    const fetchDrovecontent = useCallback(()=>{
        async (folderId =currentFolder,search=searchQuery,sort=sortBy)=>{
            if(!user) return;
            setIsDriveLoading(true)
            try{
                const parentparms = folderId || "null";
                const [foldersRes,filesRes,detailRes] = await Promise.all([
                    api.get("/api/folders",{params:{parent_id:parentparms}}),
                    api.get("/api/files",{params:{parent_id:parentparms,search,sort}}),
                    folderId ? api.get(`/api/folders/${folderId}`) : null
                ]);
                setFolders(foldersRes.data.folders);
                setFiles(filesRes.data.files);
                setBreadcrumbs(detailRes ?.data?.breadcrumbs || ROOT_BREACRUMB);
                if (detailRes) {
                    setCurrentFolder(detailRes.data);
                }
            } catch (error) {
                toast.error(errmessage(error, "Failed to fetch drive content"));
            } finally {
                setIsDriveLoading(false);
            }
        };
    }, [user, currentFolder, searchQuery, sortBy]);

    const value = { user, setUser, login, register, logout
         ,loading,isAuthenticated:!!user,uploading,uploadProgress,
         setUploading,setUploadProgress, refreshUser, currentFolder, setCurrentFolder, breadcrumbs, setBreadcrumbs,
         files, setFiles, folders, setFolders, isDriveloading, setIsDriveLoading,
         searchQuery, setSearchQuery, sortBy, setSortBy, fetchDrovecontent
        }; 
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useApp=()=> useContext(AppContext)