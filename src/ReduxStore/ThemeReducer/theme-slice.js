import { createSlice } from "@reduxjs/toolkit";
const initialthemeState = {
    darkMode: localStorage.getItem('darkMode') === 'true' ? true : false
}
const themeSlice = createSlice ({
    name:'theme',
    initialState:initialthemeState,
    reducers:{
        toggleTheme(state, action){
            const newDarkMode = !state.darkMode;
            localStorage.setItem('darkMode', newDarkMode);
            state.darkMode = newDarkMode;
        },
    }
})

export const themeAction = themeSlice.actions;

export default themeSlice.reducer;