import axios from "axios"
import { userActions } from "./user"

export const fetchUser = (userId, token) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await axios.get(
                `http://localhost:5000/user/getUser/${userId}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            )
            return response;
        }
        
        try {
            const response = await sendRequest();
            console.log(response.data);

            dispatch(userActions.createUser(response.data.user))
            
        } catch (error) {
            console.log('Failed to fetch user data!  Error: ' + error);
        }
    }
}


