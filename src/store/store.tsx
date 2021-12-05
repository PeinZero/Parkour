import {configureStore} from '@reduxjs/toolkit';

import authenticationReducer from './Authentication/authentication';
import userReducer from './User/user';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;