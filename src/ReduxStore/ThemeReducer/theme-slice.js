import { createSlice } from "@reduxjs/toolkit";
const initialthemeState = {
    darkMode: localStorage.getItem('darkMode') === 'true'
}
const themeSlice = createSlice ({
    name:'theme',
    initialState:initialthemeState,
    reducers:{
        toggleTheme(state, action){
            state.darkMode = !state.darkMode;
            localStorage.setItem('darkMode', state.darkMode);
        },
    }
})

export const themeAction = themeSlice.actions;

export default themeSlice.reducer;