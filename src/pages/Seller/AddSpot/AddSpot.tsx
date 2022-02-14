import React, { Fragment, useState, useEffect, useCallback } from 'react'

import convertTimeToString from '../../../helper/convertTimeToString'

import Button from '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import Header from '../../../components/UI/Header/Header'
import styles from './AddSpot.module.css'
import DetailsBox from '../../../components/DetailsBox/DetailsBox'
import Ripple from '../../../components/UI/Button/Ripple/Ripple'
import GMap from '../../../components/Mahad_Testing_Map/GMap'

import ClearSharpIcon from '@mui/icons-material/ClearSharp'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { MobileDatePicker } from '@mui/lab'
import { MobileTimePicker } from '@mui/lab'
import { TextField } from '@mui/material'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from 'react-google-maps'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const AddSpot = (props) => {
  // FORM dummy data =============================================================================
  let data = {
    // empty this in production, keeping only the structure
    addressLine1:
      'House # C26-A, Rim Jhim Flats, Safoora Chowrangi Next to KESC Society, 2nd Street to the left',
    addressLine2: 'Karachi, Pakistan',
    nearestLandmark: 'Near Safoora Chowrangi',
    pricePerHour: '100',

    avaliability: [
      { startTime: '10:00', endTime: '12:00' },
      { startTime: '12:00', endTime: '14:00' },
    ],
  }

  const [model, setDummyData] = useState(data)

  // if props.mode == 'edit' then call API "getSpotById"
  const modelHandler = (event) => {
    setDummyData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }

  // ===========================================================================================
  console.log('ADD SPOT RUNNING')

  

  const [currentPosition, setCurrentPosition] = useState(null)
  const [spotList, setSpotList] = useState([])
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(null)
  const [date, setDate] = useState(new Date()) // .toLocaleDateString("en-CA")

  const [startTimeError, setStartTimeError] = useState('')
  const [endTimeError, setEndTimeError] = useState('')

  // Setting up min times for timePickers
  let minStartTime = new Date()
  let minEndTime = new Date()

  minStartTime.setTime(minStartTime.getTime() - 60 * 1000)

  if (startTime !== null) {
    minEndTime.setTime(startTime.getTime() + 59 * 60 * 1000)
  }

  // FOR TESTING PURPOSES
  // console.log(minStartTime);
  // console.log(minEndTime);
  // if (date.getDate() > minStartTime.getDate()){
  //   console.log("date > minStartTime");
  // }

  // Add & Delete time handlers
  const addTimeSlotHandler = () => {
    if (startTime === null || endTime === null) {
      return
    }

    if (startTimeError.length > 0 || endTimeError.length > 0) {
      return
    }

    const newTimeSlot = {
      id: new Date().getTime(),
      date,
      startTime,
      endTime,
    }

    setSpotList((prevState) => {
      return [...prevState, newTimeSlot]
    })

    setStartTime(null)
    setEndTime(null)
  }

  const deleteTimeSlotHandler = (slotId) => {
    let updatedTimeSlots = [...spotList]
    updatedTimeSlots = updatedTimeSlots.filter(
      (timeSlot) => timeSlot.id !== slotId
    )

    setSpotList(updatedTimeSlots)
  }

  // Form submit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  // Dynamically creating added slots list
  let timeSlots = spotList.map((timeSlot, index) => {
    const timeSlotDate = timeSlot.date

    const day =
      WEEKDAYS[new Date(timeSlotDate).getDay()] +
      ' ' +
      new Date(timeSlotDate).getDate() +
      ' ' +
      MONTHS[new Date(timeSlotDate).getMonth()]
    const timeSlotStartTime = convertTimeToString(timeSlot.startTime)
    const timeSlotEndTime = convertTimeToString(timeSlot.endTime)
    return (
      <li key={index}>
        <div className={styles['timeSlotInfo']}>
          <h5>{day}</h5>
          <p> {`${timeSlotStartTime} - ${timeSlotEndTime}`} </p>
        </div>
        <Ripple onClick={() => deleteTimeSlotHandler(timeSlot.id)}>
          <ClearSharpIcon />
        </Ripple>
      </li>
    )
  })

  // Creating Google Map
  const {geolocation} = navigator;
  const onMarkerDragEnd = useCallback( (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng})
  }, []);

  useEffect(() => {
    if (geolocation) {
      geolocation.getCurrentPosition(position => {  
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCurrentPosition(currentPosition)
      })
    }
  }, [geolocation])

  return (
    <Fragment>
      <div className={styles['wrapper']}>
        <Header backLink='/seller/mySpots' content='Add Spot' />
        <div className={styles['content']}>
          <GMap zoom={14} markerPosition={currentPosition} onDragEnd={onMarkerDragEnd} className={styles['gmap']}/>
          <form onSubmit={onSubmitHandler} className={styles['form']}>
            <Input
              label='Address Line 1'
              name='addressLine1'
              type='text'
              placeholder='e.g. R-44 Saima Arabian Villas'
              className={styles['registerSpot']}
              onChange={modelHandler}
              value={model.addressLine1}
            />
            <Input
              label='Address Line 2'
              name='addressLine2'
              type='text'
              placeholder='e.g. Next to Rim Jhim flats'
              className={styles['registerSpot']}
              onChange={modelHandler}
              value={model.addressLine2}
            />
            <Input
              label='Nearest Landmark'
              name='nearestLandmark'
              type='text'
              placeholder='e.g. ABC Masjid/Park'
              className={styles['registerSpot']}
              onChange={modelHandler}
              value={model.nearestLandmark}
            />
            <Input
              label='Price Per Hour'
              name='pricePerHour'
              type='text'
              placeholder='e.g. 10, 20, 30 ... 100'
              className={styles['registerSpot']}
              onChange={modelHandler}
              value={model.pricePerHour}
            />
            <DetailsBox title='availability'>
              <div className={styles['addTimeSlot']}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className={styles['pickerWrapper']}>
                    <div className={styles['calendar']}>
                      <MobileDatePicker
                        label='Add available Slots for'
                        minDate={new Date()}
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      {/* </LocalizationProvider> */}
                    </div>
                    <div className={styles['timePickers']}>
                      <MobileTimePicker
                        className='timePicker'
                        ampm={true}
                        minTime={
                          date.getDate() > minStartTime.getDate()
                            ? null
                            : minStartTime
                        }
                        maxTime={new Date(0, 0, 0, 23, 1)}
                        label='Start Time'
                        value={startTime}
                        onChange={(newTime) => {
                          setStartTime(newTime)
                        }}
                        onError={(reason, value) => {
                          switch (reason) {
                            case 'maxTime':
                              setStartTimeError(
                                `Start time should not be after ${convertTimeToString(
                                  new Date(0, 0, 0, 23, 0)
                                )}`
                              )
                              break
                            case 'minTime':
                              setStartTimeError(
                                `Start time should not be before ${convertTimeToString(
                                  minStartTime
                                )}`
                              )
                              break
                            default:
                              setStartTimeError('')
                          }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <MobileTimePicker
                        className='timePicker'
                        disabled={startTime === null ? true : false}
                        minTime={minEndTime}
                        // maxTime={new Date(0, 0, 0, 12)}
                        label='End Time'
                        value={endTime}
                        onChange={(newTime) => {
                          setEndTime(newTime)
                        }}
                        onError={(reason, value) => {
                          switch (reason) {
                            case 'minTime':
                              setEndTimeError(
                                `End time should not be before ${convertTimeToString(
                                  minEndTime
                                )}`
                              )
                              break
                            default:
                              setEndTimeError('')
                          }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </div>
                </LocalizationProvider>

                <p className={styles['timeError']}> {startTimeError}</p>
                <p className={styles['timeError']}> {endTimeError}</p>

                <Button size='small' onClick={addTimeSlotHandler}>
                  Add Slot
                </Button>
              </div>
              <div className={styles['addedSlotsBox']}>
                <h4>Added Slots</h4>
                {timeSlots.length > 0 && (
                  <ul className={styles['addedSlots']}>{timeSlots}</ul>
                )}
                {timeSlots.length <= 0 && <p> No Slots Added</p>}
              </div>
            </DetailsBox>

            <Button btnClass='primary' className={styles['submitBtn']}>
              Add Spot
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default AddSpot

// const Map = withScriptjs(
//   withGoogleMap((props) => (
//     <GoogleMap defaultZoom={17} defaultCenter={KHI}>
//       <Marker position={KHI} draggable={true} />
//     </GoogleMap>
//   ))
// )

{
  /* <div className={styles['staticMap']}>
  <div style={{ width: '100%', height: '100%' }}>
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`} // ${process.env.REACT_APP_MAPS_API_KEY}
      containerElement={<div style={{ height: `100%` }} />}
      loadingElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </div>
</div> */
}
