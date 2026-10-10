import React,{useRef} from 'react'
import { useApp } from '../../context/AppContext'
import { useLocation } from 'react-router-dom'
import { FolderPlusIcon, HardDriveDownloadIcon, HardDriveIcon, PlusIcon, Trash2Icon,  UsersIcon } from 'lucide-react'
import {Dropdown,DropdownItem} from '../ui/Dropdown'
import { Button } from '../ui/Button'
import { formatBytes } from '../../assets/assets'
import {Location} from ""
const Sidebar = ({ mobileMenuOpen, setMobileMenuOpen, sidebarOpen }) => {
 const isuploading = false
 
  const { user, currentFolderId } = useApp()
  const Location = useLocation()
  const fileinputRef = useRef(null)

  const storage_used = Number(user?.storage_used ?? 0);
  const storage_limit = Number(user?.storage_limit ?? 1073741824);
  const storage_percentage = Math.min(100, Math.round((storage_used / storage_limit) * 100));
 
 const navitems=[
  {label:"My Drive",path:"/",icon:HardDriveIcon},
   {label:"Shared Files",path:"/shared",icon:UsersIcon},
    {label:"Trash",path:"/trash",icon:Trash2Icon}
 ]
 
  return (
    <>
{/*mobile menu*/}
{mobileMenuOpen && (
  <div className='fixed inset-0 z-50 bg-black-900/30 backdrops blur-xs md:hidden'
   onClick={()=>setMobileMenuOpen(false)}>

  </div>
  )}
<aside className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r
  border-slate-200 flex flex-col transition-transform duration-300 md:translate-x-0
  ${mobileMenuOpen ? "translate-x-0": "-translate-x-full"}`}>

    <div className='flex items-center gap-3 px-6 py-5 border-b border-slate-200'>
    <img src="/logo.svg" alt="" className='size-11'/>
    <h1 className='text-2xl font-medium uppercase text-slate-800'>
      Drove
    </h1>
      <p className='text-xs text-slate-500 tracking-wider font-medium
      uppercase'>Cloud Storage</p>
    </div>
<div className='p-4'>
  <input type='file' ref={fileinputRef} multiple className='hidden'/>

<Dropdown
trigger={
  <Button type='button' disabled={isuploading} className='w-full flex
  items-center justify-center gap-2 px-4 py-3 bg-orange-600
  hover:bg-orange-700 text-white font-semibold text-sm rounded-lg
  transition-all disabled:opacity-50 cursor-pointer'>
    <PlusIcon className='size-5'/>
    <span>Add Item</span>

  </Button>
} 
align='left'
className='w-32' >
  
  <DropdownItem icon={HardDriveDownloadIcon}onClick={()=>
    fileinputRef.current ?.click() }>
Upload Files
  </DropdownItem>

    <DropdownItem icon={FolderPlusIcon}onClick={oncreateFolderClick
 }>
New Folder
  </DropdownItem>
</Dropdown>
</div>

<nav>
  <div className=' flex-1 px-3 py-2 space-y-1 overflow-y-auto'>
   {navitems.map((items)=>{
const Icon = items.icon;
isActive = items.path === "/" ? location.pathname === "/" || location.
pathname.startsWith("/drive") : location.pathname===items.path;
return(
  <Link key={items.path} to={items.path} onClick={()=> setMobileMenuOpen(false)}
  className={`flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium transition-all
  ${isActive ? 
    "border-r-3 border-orange-500 bg-linear-to-r from-orange-50  to-orange-100  text-orange-600"
    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
  }`}>
  <Icon className={`size-4.5 ${isActive ? "text-orange-600":"text-slate-500"}`}/>
  <span>{items.label}</span>
  </Link>
)
   })}
  </div>
</nav>

<div className='p-4 border-t border-slate-200 bg-slate-50'>
  <div className='flex items-center justify-between text-xs mb-2'>
    <span className='text-slate-600 font-medium'>
      Storage
    </span>
    <span className='text-slate-900 font-semibold'>
      {used_percentage}%

    </span>
    <progressBar progress={used_percentage} color={used_percentage >90 ?"bg-red-600" : used_percentage >75 ?"bg-amber-500":"bg-orange-600"}/>
<p className='text-[11px] text-slate-500 mt-2'>
  {formatBytes(storage_used)} of {formatBytes(storage_limit)} used

</p>
  </div>
 
</div>
  </aside>


    </>
  )
}

export default Sidebar