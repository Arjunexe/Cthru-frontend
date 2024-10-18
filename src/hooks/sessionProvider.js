import MainContext from "./context";
import { jwtToken } from "../jwt/jwt";

import React, { useEffect, useState } from 'react'

function UserSessionContext({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem(jwtToken)
        if(token){
            setIsLoggedIn(true)
        }
    },[])

    const login = () => setIsLoggedIn(true);
    const logout = () => {setIsLoggedIn(false)}



  return (
   <MainContext.Provider value={{ login, logout, isLoggedIn}}>
    {children}
   </MainContext.Provider>
  )
}

export default UserSessionContext