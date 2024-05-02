import {createSlice} from '@reduxjs/toolkit'

const initialAuthState = {
    isAuthenticated : !!localStorage.getItem('authtoken'),
    token:localStorage.getItem('authtoken'),
}

const authSlice = createSlice({
 name:'authentication',
    initialState: initialAuthState,
    reducers:{
        loginHandler(state, action){
            localStorage.setItem('authtoken', action.payload)
            state.isAuthenticated = true
            state.token = action.payload
            // console.log('data',state.token)
        },
    
        logoutHandler(state){
            localStorage.removeItem('authtoken')
            localStorage.removeItem('darkMode')
            state.token = null
        }
    }
})

export const authAction = authSlice.actions;

export default authSlice.reducer;