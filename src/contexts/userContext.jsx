import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({username: "cooljmessy"})
    const [isSignedIn, setIsSignedIn] = useState(true)
  
    const toggleLogin = () => {
      setIsSignedIn(!isSignedIn)
      if (!isSignedIn){
        setUser({username: "cooljmessy"})
      }else{
        setUser(null)
      }
    }

    return (
        <UserContext.Provider value={{user, setUser, isSignedIn, setIsSignedIn, toggleLogin}}>
            {children}
        </UserContext.Provider>
    )
}