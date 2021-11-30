import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialAuthState = {isAuth: false, token: null, userID: null};
interface LoginData {
    isAuth: boolean,
    token: String,
    userID: String
}
const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action: PayloadAction<LoginData>) {
            state.isAuth = action.payload.isAuth;
            state.token = action.payload.token;
            state.userID = action.payload.userID;
        },
        logout(state) {
            state.isAuth = false;
            state.token = null;
            state.userID = null;
        },
        signup(state) {
            state.isAuth = false;
        },
    }
});


export const authActions = authenticationSlice.actions;
export default authenticationSlice.reducer;