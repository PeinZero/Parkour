import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    token: null,
    userId: null
};

interface LoginData {
    isAuth: boolean,
    token: String,
    userId: String,
}

const authenticationSlice = createSlice({
    name: 'authentication',  // name of the slice
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginData>) {
            state.isAuth = action.payload.isAuth;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout(state) {
            state.isAuth = false;
            state.token = null;
            state.userId = null;
        },
        signup(state) {
            state.isAuth = false;
        },
    }
});


export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;