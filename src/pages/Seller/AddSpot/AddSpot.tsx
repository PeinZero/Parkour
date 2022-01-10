import { Fragment, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Header from "../../../components/UI/Header/Header";
import styles from "./AddSpot.module.css";
import DetailsBox from "../../../components/DetailsBox/DetailsBox";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { MobileDatePicker } from "@mui/lab";
import { MobileTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";

const AddSpot = (props) => {
  const [spotList, setSpotList] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [day, setDay] = useState(new Date().toLocaleDateString("en-CA"));

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

  let data = {
    // empty this in production, keeping only the structure
    addressLine1:
      "House # C26-A, Rim Jhim Flats, Safoora Chowrangi Next to KESC Society, 2nd Street to the left",
    addressLine2: "Karachi, Pakistan",
    nearestLandmark: "Near Safoora Chowrangi",
    pricePerHour: "100",

    avaliability: [
      { startTime: "10:00", endTime: "12:00" },
      { startTime: "12:00", endTime: "14:00" },
    ],
  };

  // if props.mode == 'edit' then call API "getSpotById"
  const modelHandler = (event) => {
    setDummyData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const [model, setDummyData] = useState(data);

  const addTimeSlotHandler = () => {
    if (startTime === null || endTime === null) {
      return;
    }

    setSpotList((prevState) => {
      return [...prevState, { startTime, endTime }];
    });

    setStartTime(null);
    setEndTime(null);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  let timeSlots = spotList.map((timeSlot, index) => {
    if (timeSlot.startTime !== null && timeSlot.endTime !== null) {
      let date =
        timeSlot.startTime.getDate() +
        ", " +
        MONTHS[timeSlot.startTime.getMonth()];
      let startTime = timeSlot.startTime.toLocaleTimeString(
        navigator.language,
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      let endTime = timeSlot.endTime.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      });
      return (
        <li key={index}>
          {" "}
          <strong>{date}:</strong> {startTime} <strong>-</strong> {endTime}
        </li>
      );
    }
  });

  return (
    <Fragment>
      <div className={styles["wrapper"]}>
        <Header backLink="/" content="Add Spot" />
        <div className={styles["staticMap"]}></div>
        <form onSubmit={onSubmitHandler} className={styles["form"]}>
          <Input
            label="Address Line 1"
            name="addressLine1"
            type="text"
            placeholder="e.g. R-44 Saima Arabian Villas"
            className={styles["registerSpot"]}
            onChange={modelHandler}
            value={model.addressLine1}
          />
          <Input
            label="Address Line 2"
            name="addressLine2"
            type="text"
            placeholder="e.g. Next to Rim Jhim flats"
            className={styles["registerSpot"]}
            onChange={modelHandler}
            value={model.addressLine2}
          />
          <Input
            label="Nearest Landmark"
            name="nearestLandmark"
            type="text"
            placeholder="e.g. ABC Masjid/Park"
            className={styles["registerSpot"]}
            onChange={modelHandler}
            value={model.nearestLandmark}
          />
          <Input
            label="Price Per Hour"
            name="pricePerHour"
            type="text"
            placeholder="e.g. 10, 20, 30 ... 100"
            className={styles["registerSpot"]}
            onChange={modelHandler}
            value={model.pricePerHour}
          />
          <DetailsBox boxClass="availability">
            <div className={styles["addTimeSlot"]}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className={styles["pickerWrapper"]}>
                  <div className={styles["calendar"]}>
                    <MobileDatePicker
                      label="Add available Slots for"
                      value={day}
                      onChange={(newValue) => {
                        setDay(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    {/* </LocalizationProvider> */}
                  </div>
                  <div className={styles["timePickers"]}>
                    <MobileTimePicker
                      className="timePicker"
                      minTime={new Date(0, 0, 0, 10)}
                      maxTime={new Date(0, 0, 0, 12)}
                      label="Start Time"
                      value={startTime}
                      onChange={(newTime) => {
                        console.log(newTime);
                        setStartTime(newTime);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <MobileTimePicker
                      className="timePicker"
                      minTime={new Date(0, 0, 0, 11)}
                      maxTime={new Date(0, 0, 0, 12)}
                      label="End Time"
                      value={endTime}
                      onChange={(newTime) => {
                        setEndTime(newTime);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </div>
              </LocalizationProvider>

              <Button size="small" onClick={addTimeSlotHandler}>
                Add
              </Button>
            </div>
            <div className="addesSlotsWrapper">
              <h5>Added Slots</h5>
              <ul className={styles["addedTimeSlots"]}>{timeSlots}</ul>
            </div>
          </DetailsBox>
          <Button btnClass="primary" className={styles["submitBtn"]}>
            Add Spot
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddSpot;
