import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styles from "./AddSpot.module.css";
import DetailsBox from "../../../components/DetailsBox/DetailsBox";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InputDate from "../../../components/UI/InputDate/InputDate";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { time } from "console";

const AddSpot = () => {
  const [spotList, setSpotList] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const setStartTimeHandler = (event) => {
    setStartTime(event.target.value);
  }
  const setEndTimeHandler = (event) => {
    setEndTime(event.target.value);
  }

  const addTimeSlotHandler = () => {
    setSpotList((prevState) => {
      return [...prevState, {startTime, endTime}];
    })

    setStartTime("");
    setEndTime("");
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }
  
  let timeSlots = spotList.map((timeSlot, index) => {
    return(<li key={index}> {timeSlot.startTime} - {timeSlot.endTime}</li>);
  });


  let dummyData = {
    addressLine1:
      "House # C26-A, Rim Jhim Flats, Safoora Chowrangi Next to KESC Society, 2nd Street to the left",
    addressLine2: "Karachi, Pakistan",
    nearestLandmark: "Near Safoora Chowrangi",
    pricePerHour: "100",
    avaliability: [
      { startTime: "10:00", endTime: "12:00" },
      { startTime: "12:00", endTime: "14:00" },
      { startTime: "12:00", endTime: "14:00" },
    ],
  };

  return (
    <Fragment>
      <div className={styles["wrapper"]}>
        <div className={styles["header"]}>
          <Link to="/seller/mySpots" className={styles["backLink"]}>
            <ArrowBackIosNewIcon
              className={styles["back"]}
              sx={{ fontSize: 36 }}
            />
          </Link>
          <h1>Add Spot</h1>
        </div>
        <div className={styles["staticMap"]}>map</div>
        <form onSubmit={onSubmitHandler} className={styles["form"]}>
          <Input
            label="Address"
            name="address"
            type="text"
            placeholder="e.g. R-44 Saima Arabian Villas"
            className={styles["registerSpot"]}
          />
          <Input
            label="Nearest Landmark"
            name="landmark"
            type="text"
            placeholder="e.g. ABC Masjid/Park"
            className={styles["registerSpot"]}
          />
          <Input
            label="Price Per Hour"
            name="price"
            type="text"
            placeholder="e.g. 10, 20, 30 ... 100"
            className={styles["registerSpot"]}
          />
          <DetailsBox boxClass="availability">
            <div className={styles['addTimeSlot']}>
              <input type="datetime-local" value={startTime} onChange={setStartTimeHandler}/>
              <input type="datetime-local" value={endTime} onChange={setEndTimeHandler}/>
              <Button btnClass="primary" size="small" onClick={addTimeSlotHandler}>Add</Button>
            </div>
            <ul className={styles['addedTimeSlots']}>
              {timeSlots}
            </ul>
          </DetailsBox>
          <Button btnClass="primary">Add Spot</Button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddSpot;
