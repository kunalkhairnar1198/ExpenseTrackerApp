// import React, { useEffect, useState } from 'react'
// import { AuthContext } from './auth-context'

// const AuthContextProvider = (props) => {
// const [token, setToken] = useState(null)
// const [userData, setUserData] = useState(true)

// const userIsLoggedIn = !!token;

// useEffect(()=>{
//     const storedToken = localStorage.getItem('authtoken')
//     if(storedToken){
//         console.log(storedToken)
//         setToken(storedToken)
//     }
// } ,[])

// const loginHandler =(token)=>{
//     setToken(token)
//     localStorage.setItem('authtoken',token)
//     console.log(token,'---------')
    
// }

// const CompleteHandler =(userdata)=>{
//         setUserData(!userdata)
    
//     console.log(userData)
// }

// const logoutHanlder =()=>{
//     localStorage.removeItem('authtoken')
//     setToken(null)
// }

    // const authValues ={
        // token:token,
        // isLogedIn:userIsLoggedIn,
        // userdata:userData,
        // iscompleteProfile:CompleteHandler,
        // login: loginHandler,
        // logout: logoutHanlder,    
    // }
// return (
//     <AuthContext.Provider value={authValues}>
//         {props.children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthContextProvider
