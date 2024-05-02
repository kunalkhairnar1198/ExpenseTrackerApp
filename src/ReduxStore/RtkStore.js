import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthRtk/Auth-Reducer';
import profileReducer from './AuthRtk/Profile-slice/Profile-slice';
import expenseReducer from './ExpenseRtk/expense-slice';
import themeReducer from './ThemeReducer/theme-slice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        profile: profileReducer,
        expense: expenseReducer,
        theme: themeReducer
    }
})

export default store
