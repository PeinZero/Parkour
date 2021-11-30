import axios from "axios"
import { authActions } from "./authentication"

export const sendLoginData = (loginData) => {
    return async (dispatch) => {
        
        const sendRequest = async () => {
            const response = await axios.post(
                'http://localhost:5000/auth/login',
                loginData
            )

            return response;
        } 

        try {
            const response = await sendRequest();

            console.log(response.data.message)

            dispatch(authActions.login({
                isAuth: true,
                token: response.data.token,
                userID: response.data.userID
            }))

            const remainingTimeInMs = 60 * 60 * 1000
            const expiryDate = new Date(new Date().getTime() + remainingTimeInMs)

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userID', response.data.userID)
            localStorage.setItem('expiryDate', expiryDate.toISOString())

        } catch (err) {

            // Validation Check.
            if (err.response.status === 422) {
                console.log('Validation Failed')
            }

            // Authentication Check.
            if (err.response.status !== 200 && err.response.status != 201) {
                console.log('Could not authenticate you!')
            }

            dispatch(authActions.login({
                isAuth: false,
                token: null,
                userID: null
            }))

        }
    }
}


export const sendSignupData = (signupData) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = axios.post(
                'http://localhost:5000/auth/signup',
                signupData
            )
        }

        try {
            await sendRequest();
            dispatch(authActions.signup())

        } catch (err) {
            if (err.response.status === 422){
                console.log("Validation Failed!")
            }
        
            if (err.response.status != 200 && err.response.status !== 201){
                console.log("Creating a user failed!")
            }

            dispatch(authActions.signup())
        }
    }
}


export const logout = () => {
    return async (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
    }
}