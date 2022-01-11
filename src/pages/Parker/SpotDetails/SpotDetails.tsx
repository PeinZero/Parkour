import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './SpotDetails.module.css';

import DetailsBox from '../../../components/DetailsBox/DetailsBox';
import DetailsItem from '../../../components/DetailsBox/DetailsItem/DetailsItem';
import Header from '../../../components/UI/Header/Header';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileDatePicker } from "@mui/lab";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField } from '@mui/material';
import RoomIcon from "@mui/icons-material/Room";

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
    // Dummy Data [Remove this later]
    const spots = [
        {start: new Date(2022, 0, 10, 10), end: new Date(2022, 0, 10, 12)},
        {start: new Date(2022, 0, 10, 8), end: new Date(2022, 0, 10, 11)},
    ]
    // x-----------x

    let location = useLocation();
    const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
    
    const day = WEEKDAYS[new Date(date).getDay()] + " " + new Date(date).getDate() + " " + MONTHS[new Date(date).getMonth()];

    
    let spotDetails, address;
    if(location.state){
        spotDetails = location.state;
        if(!('addressLine2' in spotDetails)){
            spotDetails.addressLine2 = "hello";
        }

        if(('comment' in spotDetails)){
            spotDetails.comment = "";
        }

        if(spotDetails.seller.rating === -1){
           spotDetails.seller.rating = "Not Rated";
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
    const setDateHandeler = (newValue) => {
        const newDate = new Date(newValue).toLocaleDateString('en-CA')
        setDate(newDate);
    }


    // Data Manipulation
    const filterSpots = spots.filter(d => d.start.toISOString().split('T')[0] === date);
    const availableSpots = filterSpots.map( (d, index) => {
        // const day = d.start.toISOString().split('T')[0];
        const start =  d.start.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        const end =  d.end.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        
        // console.log("AvailableSpot", d);
        return <li key={index}> {`${start} - ${end}`} </li>
    })
    
    return (
        <div className={styles["spotDetails"]}>
            <Header backLink="/" content="Spot Details" className="small"/>
            <br />
            <div className={styles["details"]}>
                <DetailsBox 
                    boxClass="primary" name={spotDetails.seller.name} rating={spotDetails.seller.rating}>
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
                                label={`Showing available spots for`}
                                value={date}
                                onChange={setDateHandeler}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </ThemeProvider>
                    </LocalizationProvider>
                    <div className={styles['availableSlotsBox']}>
                        <h5>{day}</h5>
                        <ul className={styles['availableSlots']}>
                            {availableSpots.length > 0 ? availableSpots : <p>No Slots Available</p>}
                        </ul>
                    </div>

                </DetailsBox>
                {/* <DetailsBox boxClass="Images"></DetailsBox> */}
            </div>
        </div>
    )
}



export default SpotDetails
