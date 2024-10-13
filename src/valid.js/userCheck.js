import { useState } from "react";

export function UserLoggedIn(userData) {
    const [ loggedIn, setLoggedIn ] = useState(false)
  
  if (userData) {
    setLoggedIn(true)
    return loggedIn;
  } else {
    setLoggedIn(false)
    return loggedIn;
  }
}


