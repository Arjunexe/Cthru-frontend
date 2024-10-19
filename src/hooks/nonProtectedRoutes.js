import { useContext, useEffect } from 'react'
import SessionContext from './SessionContext'
import { useNavigate } from 'react-router-dom'

function NonProtectedRoutes({element}) {
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(SessionContext)

    useEffect(() => {
        if(isLoggedIn){
            navigate("/")
            
        }
    },[isLoggedIn, navigate])
    console.log("here at NonRoutes",isLoggedIn );
    

  return isLoggedIn ? null : element 
}

export default NonProtectedRoutes