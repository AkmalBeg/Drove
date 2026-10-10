import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Login from './pages/Login.jsx'
import Drove from './pages/Drove.jsx'
import Protected from './components/auth/Protected.jsx'
import Dashboard from './components/Layout/Dashboard.jsx'
const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login mode="login" />} />
        <Route path="/register" element={<Login mode="register" />} />
        <Route path="/s/:token" element={<SharedWithme />} />
        <Route element={<Protected />}>
          <Route element={<Dashboard />} >
            <Route path="/" element={<Drove />} />
            <Route path="/drive/:folderId" element={<Drove />} />
            <Route path="/shared" element={<SharedFile />} />
            <Route path="/trash" element={<Trash />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App