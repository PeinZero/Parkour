import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

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
import Loader from '../../../components/UI/Loader/Loader'

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

  let defaultStartTime = new Date()
  defaultStartTime.setMinutes(30, 0, 0) // Resets also seconds and milliseconds

  const [currentPosition, setCurrentPosition] = useState(null)
  const [spotList, setSpotList] = useState([])
  const [startTime, setStartTime] = useState(defaultStartTime)
  const [endTime, setEndTime] = useState(null)
  const [date, setDate] = useState(new Date()) // .toLocaleDateString("en-CA")

  const [startTimeError, setStartTimeError] = useState('')
  const [endTimeError, setEndTimeError] = useState('')
  const [overlappingError, setOverlappingError] = useState('')

  // Setting up min times for timePickers
  let minStartTime = new Date()
  let minEndTime = new Date()

  minStartTime.setTime(minStartTime.getTime() - 60 * 1000)

  if (startTime !== null) {
    minEndTime.setTime(startTime.getTime() + 59 * 60 * 1000)
  }

  // Sorting the spotList
  const sortedSpotList = useMemo(() => {
    const list = [...spotList]
    list.sort(function (ts1, ts2) {
      ts1.startTime.setSeconds(0, 0)
      ts2.startTime.setSeconds(0, 0)

      // First compare by start time
      if (ts1.startTime > ts2.startTime) {
        if (ts1.date.valueOf() >= ts2.date.valueOf()) {
          return 1
        }
        return -1
      } else if (ts1.startTime < ts2.startTime) {
        if (ts1.date.valueOf() <= ts2.date.valueOf()) {
          return -1
        }
        return 1
      }

      if (ts1.date.valueOf() < ts2.date.valueOf()) {
        return -1
      } else if (ts1.date.valueOf() > ts2.date.valueOf()) {
        return 1
      }

      // Else compare by endTime
      if (ts1.endTime < ts2.endTime) {
        return -1
      } else if (ts1.endTime > ts2.endTime) {
        return 1
      } else {
        // nothing to split them
        return 0
      }
    })

    // console.log("Spot List Sorted:", list);
    return list
  }, [spotList])

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

    // Preventing overlapping times
    let st = new Date(startTime.setSeconds(0, 0))
    let et = new Date(endTime.setSeconds(0, 0))
    let markedForRemoval = []
    let list = [...sortedSpotList]

    function CheckTimeSlot() {
      for (let i = 0; i < list.length; i++) {
        let { startTime: cst, endTime: cet, date: currentSlotDate } = list[i]

        const d1 = new Date(currentSlotDate.getTime())
        const d2 = new Date(date.getTime())

        d1.setHours(0, 0, 0, 0)
        d2.setHours(0, 0, 0, 0)

        if (d1.valueOf() !== d2.valueOf()) {
          // console.log("Different Day", d1, d2);
          continue
        }

        console.log(
          convertTimeToString(st),
          convertTimeToString(et),
          convertTimeToString(cst),
          convertTimeToString(cet)
        )
        // check if new slot is smallest isoloted slot.
        if (et < cst) {
          // console.log("1");
          return 1
        }
        // check if new slot is in between some existing slot or same as an existing slot
        else if (cst <= st && et <= cet) {
          // console.log("2");
          return -1
        }
        // check if new slot completely overlaps an existing slot
        else if (st <= cst && cet <= et) {
          // console.log("3");
          markedForRemoval.push(i)
        }
        // check if new slot endTime is in between an existing slot.
        else if (st < cst && cst <= et && et <= cet) {
          // console.log("4");
          markedForRemoval.push(i)
          et = cet
        }
        // check if new slot startTime is in between an existing slot.
        else if (cst <= st && st <= cet && cet < et) {
          // console.log("5");
          markedForRemoval.push(i)
          st = cst
        } else if (cet < st) {
          // console.log("6");
          if (i === list.length - 1) {
            // console.log("6.1");
            return 1
          }
        }
      }
      return 0
    }

    const result = CheckTimeSlot()
    // console.log("Result:", result);

    if (result === -1) {
      // console.log("-1");
      setOverlappingError('Time slot already exists.')
      return
    }

    // console.log("markedForRemoval: ", markedForRemoval);
    if (markedForRemoval.length > 0) {
      list = list.filter((slot, index) => !markedForRemoval.includes(index))
    }

    const newTimeSlot = {
      id: date.getTime(),
      date,
      startTime: st,
      endTime: et,
    }

    list.push(newTimeSlot)

    setSpotList(list)
    setStartTime(null)
    setEndTime(null)
    setOverlappingError(null)
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
  let timeSlots = sortedSpotList.map((timeSlot, index) => {
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
  const { geolocation } = navigator
  const onMarkerDragEnd = useCallback((e) => {
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()
    setCurrentPosition({ lat, lng })
  }, [])

  useEffect(() => {
    console.log('ADD SPOT => useEffect()')

    if (geolocation) {
      geolocation.getCurrentPosition((position) => {
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
          <div className={styles['mapContainer']}>
            {currentPosition === null && <Loader />}
            {currentPosition !== null &&
              <GMap
                zoom={14}
                markerPosition={currentPosition}
                onDragEnd={onMarkerDragEnd}
                className={styles['gmap']}
              />
            }
          </div>
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
                    </div>
                    <div className={styles['timePickers']}>
                      <MobileTimePicker
                        className='timePicker'
                        ampm={true}
                        minutesStep={30}
                        maxTime={new Date(0, 0, 0, 23, 1)}
                        minTime={
                          (date.getDate() > minStartTime.getDate() || minStartTime.getTime() > new Date(0,0,0,23, 0).getTime())
                            ? null
                            : minStartTime
                        }
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
                        minutesStep={30}
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
                <p className={styles['timeError']}> {overlappingError}</p>
                

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
