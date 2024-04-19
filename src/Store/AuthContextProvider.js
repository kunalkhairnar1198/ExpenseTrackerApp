import React, { useEffect, useState } from 'react'
import { AuthContext } from './auth-context'

const AuthContextProvider = (props) => {
const [token, setToken] = useState(null)
const [userData, setUserData] = useState(true)

const userIsLoggedIn = !!token;

useEffect(()=>{
    const storedToken = localStorage.getItem('authtoken')
    if(!storedToken){
        console.log(storedToken)
        setToken(storedToken)
    }
} ,[])

const loginHandler =(token)=>{
    setToken(token)
    localStorage.setItem('authtoken',token)
    console.log(token,'---------')
    
}

const CompleteHandler =(userdata)=>{
        setUserData(!userdata)
    
    console.log(userData)
}

const logoutHanlder =()=>{

}

    const authValues ={
        token:token,
        isLogedIn:false,
        userdata:userData,
        iscompleteProfile:CompleteHandler,
        login: loginHandler,
        logout: (token)=>{},    
    }
return (
    <AuthContext.Provider value={authValues}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
