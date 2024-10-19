import SessionContext from "./SessionContext";

import { jwtToken } from "../jwt/jwt";

import React, { useEffect, useState } from 'react'

function UserSessionContext({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const Token = localStorage.getItem(jwtToken)
        return Token? true : false
    })

    useEffect(() => {
        const token = localStorage.getItem(jwtToken)
        if(token){
            setIsLoggedIn(true)
        }
    },[ isLoggedIn])

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false)



  return (
   <SessionContext.Provider value={{ login, logout, isLoggedIn, setIsLoggedIn}}>
    {children}
   </SessionContext.Provider>
  )
}

export default UserSessionContext