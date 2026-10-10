
import { useApp } from '../../context/AppContext'
import {useLocation} from 'react-router-dom';
import {Spinner} from '../ui/Spinner.jsx'
import  {Outlet}  from 'react-router-dom';

const Protected = ({ children }) => {
    const {isAuthenticated,loading}=useApp()
    const location=useLocation()

    if(loading) {
        return (
            <div className='min-h-screen bg-slate-50 flex flex-col items-center
            justify-center gap-3'>
                <Spinner size="lg" className="text-orange-600"/>
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
    </>: <Outlet/>
  
}

export default Protected