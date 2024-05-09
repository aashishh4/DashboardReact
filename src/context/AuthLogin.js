import { createContext, useContext, useState } from "react";

 export const authcontext=createContext();
 
export const AuthProvider=({children})=>{
    const [isAuth,setIsAuth]=useState(localStorage.getItem("login")==="true")
    const [tokan,settokan]=useState();
    console.log("token",tokan)
    const Login=(data)=>{
        localStorage.setItem('login',"true")
        setIsAuth(true);
        settokan(data)

    }
    const Logout=()=>{
        localStorage.setItem('login',"false")
        setIsAuth(false)
    }
    return(
        <authcontext.Provider value={{Login,Logout,isAuth}}>
            {children}
        </authcontext.Provider>
    )
}
export const useAuth=()=>{
return useContext(authcontext)
}