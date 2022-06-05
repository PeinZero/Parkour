import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";

import styles from "./BookSpot.module.css";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { MobileDatePicker, MobileTimePicker } from "@mui/lab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import DetailsBox from "../../../components/DetailsBox/DetailsBox";
import DetailsItem from "../../../components/DetailsBox/DetailsItem/DetailsItem";
import Header from "../../../components/UI/Header/Header";
import Button from "../../../components/UI/Button/Button";
import Ripple from "../../../components/UI/Button/Ripple/Ripple";
import { convertTimeToString, formatDate } from "../../../helper/timeFunctions";

import { getUserByRole } from "../../../store/User/userActions";
import { bookingRequest } from "../../../store/Spot/spotActions";
import { createChat } from "../../../store/Chat/chatActions";

import RoomIcon from "@mui/icons-material/Room";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
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
          width: "600px",
        },
      },
    },
  },
});

interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

const BookSpot = (props) => {
  console.log("BOOK SPOT RUNNING!");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  let cars: any[] = [];

  if ("parker" in user && user.parker !== null) {
    cars = user.parker.cars;
  }

  if (cars.length === 0) {
    navigate("/parker/mycars");
  }

  const { state } = useLocation();
  const locationState: any = state;
  console.log(locationState);

  const {
    _id: spotId,
    addressLine1,
    addressLine2,
    nearestLandmark,
    pricePerHour,
    comment,
    availability: availabilityList,
    owner: spotOwner,
  } = locationState;
  const defaultDate: Date =
    availabilityList.length > 0 ? availabilityList[0].slotDate : new Date();
  const address = (
    <>
      <p>{addressLine1}</p>
      <p>{addressLine2}</p>
    </>
  );

  let startMinTime: Date = null;
  let startMaxTime: Date = null;
  let endMinTime: Date = null;
  let endMaxTime: Date = null;
  let { _id: sellerId, cumulativeRating: sellerRating } = spotOwner;

  if (sellerRating === -1) {
    sellerRating = "Not Rated";
  }

  // States
  const [sellerName, setSellerName] = useState(null);
  const [sellerPhone, setSellerPhone] = useState(null);
  const [date, setDate] = useState(defaultDate);
  const [selectedRadioButton, setSelectedRadioButton] = useState(-1);
  const [selectedCar, setSelectedCar] = useState("");
  const [message, setMessage] = useState(null);
  const [addedTimeSlots, setAddedTimeSlots] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [alreadyExistError, setAlreadyExistError] = useState(null);
  const [validationParaMsg, setvalidationParaMsg] = useState("");

  let isDisabled = true;

  const day =
    WEEKDAYS[new Date(date).getDay()] +
    " " +
    new Date(date).getDate() +
    " " +
    MONTHS[new Date(date).getMonth()];

  if (addedTimeSlots.length > 0 && selectedCar !== "") {
    isDisabled = false;
  }

  if (selectedRadioButton >= 0) {
    const availability = availabilityList.find(
      (availability) => formatDate(availability.slotDate) === formatDate(date)
    );
    const selectedTimeSlots = availability.slots[selectedRadioButton];

    startMinTime = new Date(new Date(selectedTimeSlots.startTime).setSeconds(0, 0));
    endMaxTime = new Date(new Date(selectedTimeSlots.endTime).setSeconds(0, 0));

    const et = new Date(endTime);
    startMaxTime = new Date(new Date(et).setHours(et.getHours() - 1));

    const st = new Date(startTime);
    endMinTime = new Date(new Date(st).setHours(st.getHours() + 1));
  }

  // Handlers

  const openChatHandler = () => {
    dispatch(createChat(sellerId)).then((chatId) => {
      navigate(`/chat/${chatId}`);
    });
  };

  const sellerInfoHandler = (user) => {
    setSellerName(user.name);
    setSellerPhone(user.phone);
  };

  const setDateHandeler = (newDate) => {
    setSelectedRadioButton(-1);
    setAddedTimeSlots([]);
    setDate(newDate);
  };

  const disableDates = (calenderDate) => {
    const availability = availabilityList.find(
      (availability) => formatDate(availability.slotDate) === formatDate(calenderDate)
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
    if (selectedRadioButton === -1) {
      return;
    }

    enum Result {
      overlapping = "New Added Time Slot already Exists",
      overLimit = "Only one Timeslot allowed per Booking Request",
      goodTimeSlot = "New Added Time Slot can be added successfully",
    }

    if (addedTimeSlots.length > 0) {
      setAlreadyExistError(true);
      setvalidationParaMsg("Only one Timeslot allowed per Booking Request");
      return;
    }

    const markedForRemoval = [];

    // st = startTime
    // et = endTime
    // cst = currentTraversed startTime of addedTimeSlots list
    // cet = currentTraversed endTime of addedTimeSlots list

    let st: Date = new Date(new Date(startTime).setSeconds(0, 0));
    let et: Date = new Date(new Date(endTime).setSeconds(0, 0));

    let status = Result.goodTimeSlot;

    // Checking st & et validity by comparing with all timeSlots in addedTimeSlots list.
    for (let i = 0; i < addedTimeSlots.length; i++) {
      const currentTimeSlot = addedTimeSlots[i];
      const cst: Date = new Date(new Date(currentTimeSlot.startTime).setSeconds(0, 0));
      const cet: Date = new Date(new Date(currentTimeSlot.endTime).setSeconds(0, 0));

      // Overlapping Conditions
      if (cst <= st && st < cet && cst < et && et <= cet) {
        status = Result.overlapping;
        break;
      }

      // Current time slot is in between new time slot
      if (st < cst && cet < et) {
        markedForRemoval.push(i);
      }
      // Modifying cst
      else if (st < cst && cst <= et && et <= cet) {
        et = cet;
        markedForRemoval.push(i);
      }
      // Modifying cet
      else if (cst <= st && st <= cet && cet < et) {
        st = cst;
        markedForRemoval.push(i);
      }
    }

    let updatedAddedTimeSlots = [...addedTimeSlots];

    if (status === Result.overlapping) {
      setAlreadyExistError(true);
      setvalidationParaMsg("Time slot already added!");
      return;
    }

    if (markedForRemoval.length > 0) {
      updatedAddedTimeSlots = addedTimeSlots.filter(
        (timeSlot, index) => !markedForRemoval.includes(index)
      );
    }

    const timeSlot: TimeSlot = { startTime: st, endTime: et };
    updatedAddedTimeSlots.push(timeSlot);

    setAddedTimeSlots(updatedAddedTimeSlots);
    setAlreadyExistError(false);
    setvalidationParaMsg("Time slot added!");
    setSelectedRadioButton(-1);
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
    const bookingData = {
      spotId: spotId,
      carId: selectedCar,
      slots: addedTimeSlots,
      day: formatDate(date),
      message: message,
    };

    console.log(bookingData);

    dispatch(bookingRequest(bookingData)).then((response) => {
      navigate("/");
    });
  };

  const viewReviewsHandler = () => {
    const reviews = [
      {
        author: {
          name: "Faizan Shahid",
        },
        text: "Such a nice person",
        providedRating: 5.0,
      },
      {
        author: {
          name: "Atif Siraiki",
        },
        text: "MY car is satisfied with the parking. P.S:- I'm a Siraiki. MY car is satisfied with the parking. P.S:- I'm a Siraiki. MY car is satisfied with the parking. P.S:- I'm a Siraiki. MY car is satisfied with the parking. P.S:- I'm a Siraiki.",
        providedRating: 4.5,
      },
      {
        author: {
          name: "Legend Pizza",
        },
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, a qui, fugiat explicabo, exercitationem nostrum rerum odio illo inventore excepturi veniam quia quo itaque aut velit doloremque suscipit sapiente. Laudantium recusandae provident non eum autem consequatur modi, corrupti delectus, voluptatum nulla quam debitis hic cum officiis quasi aspernatur repellendus quia?",
        providedRating: 3.2,
      },
      {
        author: {
          name: "VIP Guy",
        },
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, a qui, fugiat explicabo, exercitationem nostrum rerum odio illo inventore excepturi veniam quia quo itaque aut velit doloremque suscipit sapiente. Laudantium recusandae provident non eum autem consequatur modi, corrupti delectus, voluptatum nulla quam debitis hic cum officiis quasi aspernatur repellendus quia?",
        providedRating: 5.0,
      },
    ];
    navigate("/reviews", { state: { reviews: reviews, spotDetails: locationState } });
  };

  // Dynamically rendering list
  let availableSlots = [];
  if (availabilityList.length > 0) {
    availableSlots = availabilityList.find(
      (availability) => formatDate(availability.slotDate) === formatDate(date)
    ).slots;
  }

  availableSlots = availableSlots.map((timeSlot, index) => {
    const name = `${convertTimeToString(new Date(timeSlot.startTime))} - ${convertTimeToString(
      new Date(timeSlot.endTime)
    )}`;

    return (
      <div key={index} className={styles["availableSlotsFormControl"]}>
        <input
          type="radio"
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
    // console.log("Seller Id: ", sellerId)
    dispatch(getUserByRole(sellerId)).then((response) => {
      console.log(response);
      sellerInfoHandler(response.user);
    });
  }, [dispatch, sellerId]);

  useEffect(() => {
    let timer = null;

    if (alreadyExistError === false || alreadyExistError === true) {
      timer = setTimeout(() => {
        setAlreadyExistError(null);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [alreadyExistError]);

  return (
    <div className={styles["spotDetails"]}>
      <Header backLink="/" content="Spot Details" className="small" />
      <br />
      <div className={styles["details"]}>
        <DetailsBox
          boxClass="primary"
          name={sellerName}
          rating={sellerRating}
          openChat={openChatHandler}
          viewReviews={viewReviewsHandler}></DetailsBox>
        <DetailsBox title="location" icon={<RoomIcon />} iconLink={"/"} iconText="View on map">
          <ul className={styles["spotInfo"]}>
            <DetailsItem label="Address" info={address} />
            <DetailsItem label="Nearest Landmark" info={nearestLandmark} />
            <DetailsItem label="Price Per Hour" info={pricePerHour} />
            <DetailsItem label="Comment" info={comment} />
          </ul>
        </DetailsBox>

        <DetailsBox title="Select A Car" className={styles["carSelectBox"]}>
          <FormControl fullWidth className={styles["carSelectForm"]}>
            <InputLabel id="demo-simple-select-label" className={styles["carSelectLabel"]}>
              Car
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={styles["carSelect"]}
              value={selectedCar}
              label="Car"
              onChange={carSelectHandler}>
              {cars.map((car) => (
                <MenuItem className={styles["carItem"]} key={car._id} value={car._id}>
                  {" "}
                  {car.model} | {car.color} | {car.numberPlate}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DetailsBox>

        <DetailsBox title="availibility" className={styles["availibilityBottom"]}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={calanderTheme}>
              <MobileDatePicker
                label={`Showing available time slots for`}
                value={date}
                shouldDisableDate={disableDates}
                onChange={setDateHandeler}
                renderInput={(params) => <TextField {...params} />}
                className={styles["carSelect"]}
              />
            </ThemeProvider>
          </LocalizationProvider>
          <form className={styles["availableSlotsBox"]}>
            <h5>{day}</h5>
            {availableSlots.length === 0 && <p>No Slots Available</p>}
            {availableSlots.length > 0 && availableSlots}
          </form>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={styles["timePickers"]}>
              <MobileTimePicker
                className="timePicker"
                ampm={true}
                disabled={startMinTime === null ? true : false}
                minTime={startMinTime}
                maxTime={startMaxTime}
                value={startTime}
                renderInput={(params) => <TextField {...params} />}
                onChange={(newTime) => setStartTime(newTime)}
              />
              <MobileTimePicker
                className="timePicker"
                disabled={startMinTime === null ? true : false}
                minTime={endMinTime}
                maxTime={endMaxTime}
                value={endTime}
                onChange={(newTime) => setEndTime(newTime)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <p
              className={`${styles["status"]} ${alreadyExistError && styles["error"]} ${
                alreadyExistError === false && styles["added"]
              }`}>
              {validationParaMsg}
            </p>
            <Button type="button" size="small" onClick={addTimeSlotHandler}>
              {" "}
              Add Time Slot{" "}
            </Button>
          </LocalizationProvider>

          <div className={styles["addedSlotsBox"]}>
            <h4>Added Time Slots</h4>
            {renderedAddedTimeSlots.length === 0 && <p> No time slots added</p>}
            <ul>{renderedAddedTimeSlots.length > 0 && renderedAddedTimeSlots}</ul>
          </div>
        </DetailsBox>
        {/* <DetailsBox boxClass="Images"></DetailsBox> */}
        <DetailsBox title="Message" className={styles["messageBox"]}>
          <textarea
            placeholder="Send a message to the seller..."
            onChange={messageChangeHandler}></textarea>
        </DetailsBox>
        <Button
          type="button"
          btnClass="primary"
          onClick={bookSpotHandler}
          disabled={isDisabled}>
          Request Spot
        </Button>
      </div>
    </div>
  );
};

export default BookSpot;
