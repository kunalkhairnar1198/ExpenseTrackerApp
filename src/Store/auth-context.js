import React from 'react'

export const AuthContext = React.createContext({
    token:'',
    isLogedIn:false,
    userdata:true,
    iscompleteProfile:()=>{},
    login: (token)=>{},
    logout: (token)=>{},    
})


