import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './BookSpot.module.css';

import DetailsBox from '../../../components/DetailsBox/DetailsBox';
import DetailsItem from '../../../components/DetailsBox/DetailsItem/DetailsItem';
import Header from '../../../components/UI/Header/Header';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileDatePicker, MobileTimePicker } from "@mui/lab";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material';
import RoomIcon from "@mui/icons-material/Room";
import { convertTimeToString, formatDate } from '../../../helper/timeFunctions';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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

 
const SpotDetails = (props) => { 
    let location = useLocation(); 
    let spotDetails, address, availabilityList, defaultDate;

    const [date, setDate] = useState(defaultDate);
    const day = WEEKDAYS[new Date(date).getDay()] + " " + new Date(date).getDate() + " " + MONTHS[new Date(date).getMonth()];

    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [firstRadioChecked, setFirstRadioChecked] = useState(0);

    if(location.state){
        spotDetails = location.state;
        console.log(spotDetails);
        
        if(!('addressLine2' in spotDetails)){
            spotDetails.addressLine2 = "hello";
        }

        if(('comment' in spotDetails)){
            spotDetails.comment = "";
        }

        availabilityList = spotDetails.availability
        defaultDate = availabilityList[0].slotDate

        if(spotDetails.owner.cumulativeRating === -1){
           spotDetails.owner.cumulativeRating = "Not Rated";
        }

        address = (
            <>
                {spotDetails.addressLine1}
                <br />
                {spotDetails.addressLine2}
            </>
        )

    } 
    

    // Handlers
    const setDateHandeler = (newDate) => {
        setDate(newDate);
    }

    const disableDates = (calenderDate) => {
        const availability = availabilityList.find(availability => formatDate(availability.slotDate) === formatDate(calenderDate))
        if (availability){
            return false;
        }
        return true;  
    }

    const selectTimeSlotHandler = (event, index) => {
        setFirstRadioChecked(index);
    }

    // Dynamically rendering list
    let availableSlots = [];
    if(availabilityList.length > 0){
        availableSlots = availabilityList.find(availability => formatDate(availability.slotDate) === formatDate(date)).slots;
    }
    
    availableSlots = availableSlots.map( (timeSlot, index) => {
        const name = `${convertTimeToString(new Date(timeSlot.startTime))} - ${convertTimeToString(new Date(timeSlot.endTime))}`;

        return (
            <div className={styles['availableSlotsFormControl']}>
                <input key={index} type="radio" name={name} value={timeSlot} onChange={(e) => selectTimeSlotHandler(e, index)} checked={index === firstRadioChecked ? true : false}/>
                <label htmlFor={name}> {name} </label>
            </div>
        )
    })

    console.log(availableSlots);

    return (
        <div className={styles["spotDetails"]}>
            <Header backLink="/" content="Spot Details" className="small"/>
            <br />
            <div className={styles["details"]}>
                <DetailsBox 
                    boxClass="primary" name={spotDetails.owner.name} rating={spotDetails.owner.cumulativeRating}>
                </DetailsBox>
                <DetailsBox title="location" icon={<RoomIcon/>} iconLink={"/"} iconText="View on map">
                    <ul className={styles['spotInfo']}>
                         <DetailsItem label="Address" info={address}/>
                         <DetailsItem label="Nearest Landmark" info={spotDetails.nearestLandmark}/>
                         <DetailsItem label="Price Per Hour" info={spotDetails.pricePerHour}/>
                         <DetailsItem label="Comment" info={spotDetails.comment}/>
                    </ul>
                </DetailsBox>
                
                <DetailsBox title="availibility" className={styles['availibilityBottom']}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <ThemeProvider theme={calanderTheme}>
                            <MobileDatePicker
                                label={`Showing available time slots for`}
                                value={date}
                                shouldDisableDate={disableDates}
                                onChange={setDateHandeler}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </ThemeProvider>
                    </LocalizationProvider>
                    <form className={styles['availableSlotsBox']}>
                        <h5>{day}</h5>
                        { availableSlots.length === 0 && <p>No Slots Available</p>}
                        { availableSlots.length > 0 && availableSlots }
                    </form>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className={styles['timePickers']}>
                      <MobileTimePicker
                        className='timePicker'
                        value={startTime}
                        renderInput={(params) => <TextField {...params} />}
                        onChange = {(newTime => setStartTime(newTime))}
                      />
                      <MobileTimePicker
                        className='timePicker'
                        value={endTime}
                        onChange = {(newTime => setEndTime(newTime))}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                    </LocalizationProvider>

                </DetailsBox>
                {/* <DetailsBox boxClass="Images"></DetailsBox> */}
            </div>
        </div>
    )
}



export default SpotDetails
