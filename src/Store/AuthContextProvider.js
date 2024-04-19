import React, { useState } from 'react'
import { AuthContext } from './auth-context'

const AuthContextProvider = (props) => {
const [token, setToken] = useState(null)

const userIsLoggedIn = !!token;

const loginHandler =(token)=>{
    setToken(token)
    localStorage.setItem('authtoken',token)
    console.log(token)
}

const logoutHanlder =()=>{

}

    const authValues ={
        token:token,
        isLogedIn:false,
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
