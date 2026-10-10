import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useState } from 'react'

const Dashboard = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className='min-h-screen bg-slate-50  text-slate-500 flex flex-col'>
{/*sidebar*/}
<Sidebar mobileMenuOpen={mobileMenuOpen}
setMobileMenuOpen={setMobileMenuOpen} oncreatefolderClick={()=>
  setSidebarOpen(true)}/>

{/*main content*/}
<div className="md:pl-64 flex flex-col flex-1">
{/*header*/}
<Header onmobileToggle={()=>setMobileMenuOpen(!mobileMenuOpen)}/>

<main className='flex-1 p-4 md:p-6 0verflow-y-auto'> 
    <Outlet/>
</main>
</div>
    </div>
  )
}

export default Dashboard