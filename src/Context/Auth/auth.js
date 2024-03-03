import { createContext, useEffect, useState } from "react";
import React from 'react';
export let authContext = createContext()




const AuthProvider = ( {children}) => {
    const [token ,setToken]=useState(null)
    useEffect(function(){
        if(localStorage.getItem("tkn")!=null)
        {
            setToken(localStorage.getItem("tkn"))
        }
    },[])
    return (
        <authContext.Provider value={{token,setToken}}>
           {children} 
        </authContext.Provider>
    );
}

export default AuthProvider;
