import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { start } from "repl";

const initialState = {
    // Profile Info
    name: null,
    phone: null,
    email: null,
    gender: null,
    dob: null,
    password: null,
    
    // State
    isParker: true,
    isSeller: false,
    currentRoleParker: true,
    
    // Parker Details
    parker: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser(state, action){
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.gender = action.payload.gender;
            state.dob = action.payload.DOB;
            state.password = action.payload.password;
            state.isParker = action.payload.isParker;
            state.isSeller = action.payload.isSeller;
            state.currentRoleParker = action.payload.currentRoleParker;
            state.parker = action.payload.parker;
        },
        switchRole(state){
            state.currentRoleParker = !state.currentRoleParker;
        },
        set_isSeller(state, action){
            state.isSeller = action.payload.isSeller;
        },
        set_parker(state, action){
            state.parker = action.payload.parker;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;