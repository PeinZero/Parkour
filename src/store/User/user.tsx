import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Profile Info
    name: null,
    phone: null,
    email: null,
    gender: null,
    dob: null,
    password: null,
    credit: null,
    
    // State
    isParker: true,
    isSeller: false,
    currentRoleParker: null,
    
    // Parker Details
    parker: null,

    // Seller Details
    seller: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser(state, action){
            // Profile Info
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.gender = action.payload.gender;
            state.dob = action.payload.DOB;
            state.password = action.payload.password;

            // State
            state.isParker = action.payload.isParker;
            state.isSeller = action.payload.isSeller;
            state.currentRoleParker = action.payload.currentRoleParker;

            // Parker & Seller Details
            state.parker = action.payload.parker;
            state.seller = action.payload.seller;
        },
        updateUserInfo(state, action){
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.email = action.payload.email;
            state.gender = action.payload.gender;
            state.dob = action.payload.dob;
        },
        switchRole(state){
            state.currentRoleParker = !state.currentRoleParker;
        },
        set_isSeller(state, action){
            state.isSeller = action.payload.isSeller;
        },
        set_parker(state, action){
            state.parker = action.payload.parker;
        },
        set_cars(state, action){
            console.log(action.payload.cars);
            console.log(action.payload);
            
            state.parker.cars = action.payload.cars;
        },
        set_default_car(state, action){
            state.parker.defaultCar = action.payload.defaultCar;
        },
        set_credit(state, action){
            state.credit = action.payload.credit;
        }
    }  
})

export const userActions = userSlice.actions;
export default userSlice.reducer;