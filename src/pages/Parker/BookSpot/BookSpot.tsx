import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import styles from './BookSpot.module.css';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileDatePicker, MobileTimePicker } from '@mui/lab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

import DetailsBox from '../../../components/DetailsBox/DetailsBox';
import DetailsItem from '../../../components/DetailsBox/DetailsItem/DetailsItem';
import Header from '../../../components/UI/Header/Header';
import Button from '../../../components/UI/Button/Button';
import Ripple from '../../../components/UI/Button/Ripple/Ripple';
import { convertTimeToString, formatDate } from '../../../helper/timeFunctions';
import { getUserByRole } from '../../../store/User/userActions';

import RoomIcon from '@mui/icons-material/Room';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
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
];

const calanderTheme = createTheme({
  components: {
    // Name of the component
    MuiFormControl: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          width: '600px',
        },
      },
    },
  },
});

interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

const SpotDetails = (props) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let location = useLocation();
  let spotDetails,
    address,
    availabilityList,
    sellerId = '',
    defaultDate: Date,
    cars: any[] = [];

  if ('parker' in user && user.parker !== null) {
    cars = user.parker.cars;
  }

  if (cars.length === 0) {
    navigate('/parker/mycars');
  }

  if (location.state) {
    spotDetails = location.state;

    if (!('addressLine2' in spotDetails)) {
      spotDetails.addressLine2 = 'hello';
    }

    if ('comment' in spotDetails) {
      spotDetails.comment = '';
    }

    availabilityList = spotDetails.availability;
    defaultDate = availabilityList[0].slotDate;
    sellerId = spotDetails.owner._id;

    if (spotDetails.owner.cumulativeRating === -1) {
      spotDetails.owner.cumulativeRating = 'Not Rated';
    }

    address = (
      <>
        {spotDetails.addressLine1}
        <br />
        {spotDetails.addressLine2}
      </>
    );
  }

  const [sellerName, setSellerName] = useState(null);
  const [sellerPhone, setSellerPhone] = useState(null);
  const [date, setDate] = useState(defaultDate);
  const [selectedRadioButton, setSelectedRadioButton] = useState(-1);
  const [selectedCar, setSelectedCar] = useState('');
  const [message, setMessage] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [addedTimeSlots, setAddedTimeSlots] = useState([]);

  const day =
    WEEKDAYS[new Date(date).getDay()] +
    ' ' +
    new Date(date).getDate() +
    ' ' +
    MONTHS[new Date(date).getMonth()];

  let startMinTime: Date = null,
    startMaxTime: Date = null,
    endMinTime: Date = null,
    endMaxTime: Date = null;

  if (selectedRadioButton >= 0) {
    startMinTime = new Date(new Date(startTime).setSeconds(0, 0));
    endMaxTime = new Date(new Date(endTime).setSeconds(0, 0));
    startMaxTime = new Date(
      new Date(endMaxTime).setHours(endMaxTime.getHours() - 1)
    );
    endMinTime = new Date(
      new Date(startMinTime).setHours(startMinTime.getHours() + 1)
    );
  }

  // Handlers
  const sellerInfoHandler = (user) => {   
    setSellerName(user.name);
    setSellerPhone(user.phone);
  };

  const setDateHandeler = (newDate) => {
    setDate(newDate);
  };

  const disableDates = (calenderDate) => {
    const availability = availabilityList.find(
      (availability) =>
        formatDate(availability.slotDate) === formatDate(calenderDate)
    );
    if (availability) {
      return false;
    }
    return true;
  };

  const selectTimeSlotHandler = (index, timeSlot: TimeSlot) => {
    setStartTime(timeSlot.startTime);
    setEndTime(timeSlot.endTime);
    setSelectedRadioButton(index);
  };

  const addTimeSlotHandler = () => {
    const timeSlot: TimeSlot = { startTime, endTime };

    setAddedTimeSlots((prevState) => {
      return [...prevState, timeSlot];
    });
  };

  const deleteTimeSlotHandler = (slotIndex) => {
    let updatedAddedTimeSlots = [...addedTimeSlots];
    updatedAddedTimeSlots = updatedAddedTimeSlots.filter(
      (timeSlot, index) => index !== slotIndex
    );

    setAddedTimeSlots(updatedAddedTimeSlots);
  };

  const carSelectHandler = (event) => {
    setSelectedCar(event.target.value);
  };

  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const bookSpotHandler = () => {
    console.log(user.parker._id);
    console.log(selectedCar);
    console.log(formatDate(date));
    console.log(addedTimeSlots);
    console.log(message);
  };

  // Dynamically rendering list
  let availableSlots = [];
  if (availabilityList.length > 0) {
    availableSlots = availabilityList.find(
      (availability) => formatDate(availability.slotDate) === formatDate(date)
    ).slots;
  }

  availableSlots = availableSlots.map((timeSlot, index) => {
    const name = `${convertTimeToString(
      new Date(timeSlot.startTime)
    )} - ${convertTimeToString(new Date(timeSlot.endTime))}`;

    return (
      <div key={index} className={styles['availableSlotsFormControl']}>
        <input
          type='radio'
          name={name}
          onChange={() => selectTimeSlotHandler(index, timeSlot)}
          checked={index === selectedRadioButton ? true : false}
        />
        <label htmlFor={name}> {name} </label>
      </div>
    );
  });

  let renderedAddedTimeSlots = addedTimeSlots.map((timeSlot, index) => {
    const startTime = convertTimeToString(new Date(timeSlot.startTime));
    const endTime = convertTimeToString(new Date(timeSlot.endTime));
    return (
      <li key={index}>
        <p>
          {startTime} - {endTime}
        </p>
        <Ripple onClick={() => deleteTimeSlotHandler(index)}>
          <ClearSharpIcon />
        </Ripple>
      </li>
    );
  });

  // Use Effects

  useEffect(() => {
    console.log("BookSpot => useEffect()");
    console.log("Seller Id: ", sellerId)
    dispatch(getUserByRole(sellerId))
        .then((response) => {
          sellerInfoHandler(response.data.user);
        });
  }, [dispatch, sellerId]);

  return (
    <div className={styles['spotDetails']}>
      <Header backLink='/' content='Spot Details' className='small' />
      <br />
      <div className={styles['details']}>
        <DetailsBox
          boxClass='primary'
          name={sellerName}
          rating={spotDetails.owner.cumulativeRating}
        ></DetailsBox>
        <DetailsBox
          title='location'
          icon={<RoomIcon />}
          iconLink={'/'}
          iconText='View on map'
        >
          <ul className={styles['spotInfo']}>
            <DetailsItem label='Address' info={address} />
            <DetailsItem
              label='Nearest Landmark'
              info={spotDetails.nearestLandmark}
            />
            <DetailsItem
              label='Price Per Hour'
              info={spotDetails.pricePerHour}
            />
            <DetailsItem label='Comment' info={spotDetails.comment} />
          </ul>
        </DetailsBox>

        <DetailsBox title='Select A Car' className={styles['carSelectBox']}>
          <FormControl fullWidth className={styles['carSelectForm']}>
            <InputLabel
              id='demo-simple-select-label'
              className={styles['carSelectLabel']}
            >
              Car
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              className={styles['carSelect']}
              value={selectedCar}
              label='Car'
              onChange={carSelectHandler}
            >
              {cars.map((car) => (
                <MenuItem
                  className={styles['carItem']}
                  key={car._id}
                  value={car._id}
                >
                  {' '}
                  {car.model} | {car.color} | {car.numberPlate}{' '}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </DetailsBox>

        <DetailsBox
          title='availibility'
          className={styles['availibilityBottom']}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={calanderTheme}>
              <MobileDatePicker
                label={`Showing available time slots for`}
                value={date}
                shouldDisableDate={disableDates}
                onChange={setDateHandeler}
                renderInput={(params) => <TextField {...params} />}
                className={styles['carSelect']}
              />
            </ThemeProvider>
          </LocalizationProvider>
          <form className={styles['availableSlotsBox']}>
            <h5>{day}</h5>
            {availableSlots.length === 0 && <p>No Slots Available</p>}
            {availableSlots.length > 0 && availableSlots}
          </form>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={styles['timePickers']}>
              <MobileTimePicker
                className='timePicker'
                disabled={startMinTime === null ? true : false}
                minTime={startMinTime}
                maxTime={startMaxTime}
                value={startTime}
                renderInput={(params) => <TextField {...params} />}
                onChange={(newTime) => setStartTime(newTime)}
              />
              <MobileTimePicker
                className='timePicker'
                disabled={startMinTime === null ? true : false}
                minTime={endMinTime}
                maxTime={endMaxTime}
                value={endTime}
                onChange={(newTime) => setEndTime(newTime)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <Button type='button' size='small' onClick={addTimeSlotHandler}>
              {' '}
              Add Time Slot{' '}
            </Button>
          </LocalizationProvider>

          <div className={styles['addedSlotsBox']}>
            <h4>Added Time Slots</h4>
            {renderedAddedTimeSlots.length === 0 && <p> No time slots added</p>}
            <ul>
              {renderedAddedTimeSlots.length > 0 && renderedAddedTimeSlots}
            </ul>
          </div>
        </DetailsBox>
        {/* <DetailsBox boxClass="Images"></DetailsBox> */}
        <DetailsBox title='Message' className={styles['messageBox']}>
          <textarea
            placeholder='Send a message to the seller...'
            onChange={messageChangeHandler}
          ></textarea>
        </DetailsBox>
        <Button type='button' btnClass='primary' onClick={bookSpotHandler}>
          Request Spot
        </Button>
      </div>
    </div>
  );
};

export default SpotDetails;
