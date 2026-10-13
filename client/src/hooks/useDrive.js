import toast from "react-hot-toast";
import { useApp } from "../context/AppContext";

const isFolderitem=(item)=>item?.item_type === "folder"||(!item?.mine_type && item?.path!==undefined)

export function useDrive(){
    const {currentFolder,uploading,setUploading,uploadProgress,setUploadProgress,fetchDrovecontent, refreshUser} =useApp();
       

    const runaction=async(apiCall,successmsg,errormsg,aftersucces)=>{
        try {
            const res =await apiCall;
            if(successmsg) toast.success(successmsg)
                if(aftersucces) await aftersucces(res.data)
                    return true;
        } catch (err) {
            toast.error(err.response?.data?.error||errormsg)
        }
    }


    //upload file

    const uploadFiles=async(filelist,folder_id=currentFolder)=>{
        if(!filelist?.length) return ;
        setUploading(true);
       setUploadProgress(0);

       const totalsize=Array.from(filelist).reduce((acc,f)=>acc+(f.size||0),0)
       const step=92/Math.max(12,totalsize/409715.2);
       const interval=setInterval(()=>{
        setUploadProgress((p)=>(p>=92 ? p:Math.min(92,p+step)))
       },100)

       const formdata=new FormData();
       Array.from(filelist).forEach((f)=>formdata.append("files",f));
       if (folder_id) formdata.append("folder_id",folder_id)
        
        try {
            const {data}=await api.post("/api/files/upload",formdata,{
                headers:{"content-Type":"multipart/form-data"}
            });
            clearInterval(interval);
            setUploadProgress(100);
            await new Promise((r) => setTimeout(r,300))
            toast.success(`${data.files.length} files uploaded successfully`);
            await fetchDrovecontent(folder_id)
            await refreshUser()
        } catch (err) {
            clearInterval(interval);
            toast.error(err.response?.data?.error || "file upload failed")
        }
        finally{
            clearInterval(interval)
            setUploading(false)
            setUploadProgress(0)
            
        }
        
       
    }
//create folder
const createFolder=(name,parent_id=currentFolder)=>
    runaction(
        api.post("/api/folder",{name,parent_id}),"folder created","error creating folder",
        ()=>fetchDrovecontent(parent_id)
    )


const renameItem =(item,newname)=>{
const isFolder=isFolderitem(item);
const endPoint =isFolder?"folder":"files";
const id=item.id||item;
return runaction(
    api.post(`/api/${endPoint}/${id}/rename`,{name,newname}),
    `${isFolder ? "folder":"file"} renamed`,"Error renaming item",()=>
        fetchDrovecontent()
)}

const moveItem=(item,targetfolderId)=>{
    const isFolder= isFolderitem(item)
    const endPoint =isFolder?"folder":"files";
    const payload =isFolder? {target_parent:targetfolderId}:{target_folder:targetfolderId};
   const id=item.id||item;

   return runaction(
    api.post(`/api/${endPoint}/${id}/move`,payload),
    `${isFolder ? "folder":"file"} moved`,"Error moveing item",()=>
        fetchDrovecontent()
)
}


const deleteitem=(item)=>{
    const isFolder= isFolderitem(item)
    const endPoint =isFolder?"folder":"files";
    const payload =isFolder? {target_parent:targetfolderId}:{target_folder:targetfolderId};
   const id=item.id||item;

   return runaction(
    api.delete(`/api/${endPoint}/${id}`),
    `${isFolder ? "folder":"file"} moved to trash`,"Error deleting item",()=>
        fetchDrovecontent()
)
}

const restoreitem=(item)=>{
    
    const endPoint =isFolderitem(item)?"folder":"files";
   const id=item.id||item;

   return runaction(
    api.post(`/api/${endPoint}/${id}/restore`),
    "item restored" ,"Error restore item"
)
}


const deletepermanent=(item)=>{
    
    const endPoint =isFolderitem(item)?"folder":"files";
   const id=item.id||item;

   return runaction(
    api.delete(`/api/${endPoint}/${id}/permanent`),
    "deleted permanently" ,"Error in deleting item"
)
}
return{
    uploadFiles,createFolder,renameItem,restoreitem,moveItem,deleteitem,
    deletepermanent,uploading,uploadProgress
}
}