import {configureStore} from '@reduxjs/toolkit';
import authReducer from './AuthRtk/Auth-Reducer';
import profileReducer from './Profile-slice/Profile-slice';

const store = configureStore({
    reducer:{
        auth: authReducer,
        profile: profileReducer
    }
})

export default store
