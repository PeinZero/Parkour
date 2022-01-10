import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import styles from './SpotDetails.module.css';

import DetailsBox from '../../../components/DetailsBox/DetailsBox';
import Header from '../../../components/UI/Header/Header';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { MobileDatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const SpotDetails = () => {
    // Dummy Data [Remove this later]
    const spots = [
        {start: new Date(2022, 0, 10, 10), end: new Date(2022, 0, 10, 12)},
        {start: new Date(2022, 0, 10, 8), end: new Date(2022, 0, 10, 11)},
    ]

    const spotDetail = {
        address: "House # C26-A, Rim Jhim Flats, Safoora Chowrangi,Next to KESC Society, 2nd Street to the left.",
        nearestLandmark: "Near Safoora Chowrangi",
        price: 20,
        comments: "Enough space for big cars"
    }
    // x-----------x

    const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
    const user = useAppSelector(state => state.user);

    const name = user.name;
    const phone = user.phone;
    const day = WEEKDAYS[new Date(date).getDay()] + " " + new Date(date).getDate() + " " + MONTHS[new Date(date).getMonth()];

    let rating;
    if(user.currentRoleParker && user.parker != null){
        rating = user.parker.cumulativeRating;
    }
    else if(user.seller != null){
        rating = user.seller.cumulativeRating
    };
    if(rating === -1){
        rating = "N.R";
    }

    // Handlers
    const setDateHandeler = (newValue) => {
        const newDate = new Date(newValue).toLocaleDateString('en-CA')
        setDate(newDate);
    }


    // Data Manipulation
    const filterSpots = spots.filter(d => d.start.toISOString().split('T')[0] === date);
    const availableSpots = filterSpots.map( (d, index) => {
        const day = d.start.toISOString().split('T')[0];
        const start =  d.start.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        const end =  d.end.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
        
        console.log("AvailableSpot", d);
        return <li key={index}> {`${start} - ${end}`} </li>
    })

    
    return (
        <div className={styles["spotDetails"]}>
            <Header backLink="/" content="Spot Details" className="small"/>
            <br />
            <div className={styles["details"]}>
                <DetailsBox 
                    boxClass="primary" name={name} rating={rating} phone={phone}>
                </DetailsBox>
                <DetailsBox boxClass="location" spotDetail={spotDetail}></DetailsBox>
                
                <DetailsBox boxClass="availibility" className={styles['availibilityBottom']}>
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
                            {availableSpots}
                        </ul>
                    </div>

                </DetailsBox>
                {/* <DetailsBox boxClass="Images"></DetailsBox> */}
            </div>
        </div>
    )
}



export default SpotDetails
