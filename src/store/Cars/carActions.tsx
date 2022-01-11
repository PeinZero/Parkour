import axios from 'axios'
import { backendLink } from '../../helper/backendLink'
import { userActions } from '../User/user'

export const sendCarData = (carData, token) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      return axios.post(
        `${backendLink}/car/addcar`,
        {
          model: carData
        },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
    }

    try {
      const response = await sendRequest()
      dispatch(userActions.set_cars({ cars: response.data.cars }))
      return response;
      
    } catch (err) {
      if (err.response.status === 422) {
        console.log('Validation Failed!')
      }

      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log('Creating a car failed!')
      }
    }
  }
}

export const deleteCar = (carId, token) => {
  return async (dispatch) => {
    console.log(carId, token)
    const sendRequest = async () => {
      return axios.delete(`${backendLink}/car/deletecar/${carId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
    }

    try {
      const response = await sendRequest()
      console.log(response.data.cars)

      dispatch(userActions.set_cars({ cars: response.data.cars }))
    } catch (err) {
      if (err.response.status === 422) {
        console.log('Validation Failed!')
      }

      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log('Deleting a car failed!')
      }
    }
  }
}

export const setDefaultCar = (carId) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      return axios.post(`${backendLink}/car/setdefaultcar`, { carId: carId })
    }

    try {
      const response = await sendRequest()
      dispatch(userActions.set_cars(response.data.defaultCar))
    } catch (err) {
      if (err.response.status === 422) {
        console.log('Validation Failed!')
      }

      if (err.response.status !== 200 && err.response.status !== 201) {
        console.log('Deleting a car failed!')
      }
    }
  }
}
