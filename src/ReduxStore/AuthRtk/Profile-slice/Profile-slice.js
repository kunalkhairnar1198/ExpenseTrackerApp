import { createSlice } from "@reduxjs/toolkit"

const initialProrileState = {
    userData: true,
    token:localStorage.getItem('authtoken')
}

const profileSlice = createSlice({
    name:'profile',
    initialState:initialProrileState,
    reducers:{
        isCompleteProfile(state, action){
            state.userData = !action.payload
            console.log('ACTION',action)
        }
    }
})

export const  profileAction = profileSlice.actions;

export default profileSlice.reducer;