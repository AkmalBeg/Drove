
import { useApp } from '../../context/AppContext'
import {uselocation} from "react-router-dom"
import {spinner} from '../ui/Spinner'

const Protected = ({ children }) => {
    const {isAuthenticated,loading}=useApp()
    const location=uselocation()

    if(loading) {
        return (
            <div className='min-h-screen bg-slate-50 flex flex-col items-center
            justify-center gap-3'>
                <spinner size="lg" className="text-orange-600"/>
                <p className='text-sm text-slate-500 font-medium'>Loading...</p>
            </div>
        )
    }

    if(!isAuthenticated){
        return <Navigate to="/login" state={{from:location}} replace/>
    }
  return children ?
    <>
{children}
    </>: <outlet/>
  
}

export default Protected