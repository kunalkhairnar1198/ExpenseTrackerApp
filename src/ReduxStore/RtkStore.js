import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthRtk/Auth-Reducer';
import profileReducer from './Profile-slice/Profile-slice';
import expenseReducer from './ExpenseRtk/expense-slice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        profile: profileReducer,
        expense: expenseReducer
    }
})

export default store
