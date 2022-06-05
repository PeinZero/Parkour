import React, { Fragment, useState, useEffect, useReducer, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { convertTimeToString, formatDate } from "../../../helper/timeFunctions";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Header from "../../../components/UI/Header/Header";
import styles from "./AddSpot.module.css";
import DetailsBox from "../../../components/DetailsBox/DetailsBox";
import Ripple from "../../../components/UI/Button/Ripple/Ripple";
import GMap from "../../../components/GMap/SelectSpotMap/GMap";

import ClearSharpIcon from "@mui/icons-material/ClearSharp";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { MobileDatePicker } from "@mui/lab";
import { MobileTimePicker } from "@mui/lab";
import { TextField } from "@mui/material";

import Loader from "../../../components/UI/Loader/Loader";

import { addSpot, editSpot } from "../../../store/Spot/spotActions";
import { useAppDispatch } from "../../../store/hooks";

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

// function spotInfoInit(spotInfo){
//   return {
//     addressLine1: spotInfo.addressLine1,
//     addressLine2: spotInfo.addressLine2,
//     nearestLandmark: spotInfo.nearestLandmark,
//     pricePerHour: spotInfo.pricePerHour,
//   }
// }

function spotInfoReducer(spotInfoState, action) {
  switch (action.type) {
    case "spotName":
      return { ...spotInfoState, spotName: action.value };
    case "addressLine1":
      return { ...spotInfoState, addressLine1: action.value };
    case "addressLine2":
      return { ...spotInfoState, addressLine2: action.value };
    case "nearestLandmark":
      return { ...spotInfoState, nearestLandmark: action.value };
    case "pricePerHour":
      return { ...spotInfoState, pricePerHour: action.value };
    case "set_spotInfo":
      return {
        spotName: action.value.spotName,
        addressLine1: action.value.addressLine1,
        addressLine2: action.value.addressLine2,
        nearestLandmark: action.value.nearestLandmark,
        pricePerHour: action.value.pricePerHour,
      };
    default:
      return { addressLine1: "", addressLine2: "", nearestLandmark: "", pricePerHour: 10 };
  }
}

const AddSpot = (props) => {
  // ===========================================================================================
  console.log("ADD SPOT RUNNING");

  const location = useLocation();
  const { state } = location;
  const locationState: any = state;
  // console.log(locationState);

  let spotInfo = {
    spotName: "",
    addressLine1: "",
    addressLine2: "",
    nearestLandmark: "",
    pricePerHour: 10,
  };
  let defaultStartTime = new Date();
  let defaultSlotList = [];
  let pageName = "Add Spot";
  let spotId = null;

  if (locationState) {
    pageName = "Edit Spot";
    defaultSlotList = locationState.availability;
    spotId = locationState._id;
  }

  if (defaultStartTime.getMinutes() < 30) {
    defaultStartTime.setMinutes(30, 0, 0); // Resets also seconds and milliseconds
  } else {
    defaultStartTime.setMinutes(60, 0, 0);
  }

  const [spotInfoState, spotInfoDispatch] = useReducer(spotInfoReducer, spotInfo);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [slotList, setSlotList] = useState(defaultSlotList);
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(new Date()); // .toLocaleDateString("en-CA")

  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [overlappingError, setOverlappingError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Extracting Spot Info form field values
  // console.log(spotInfoState);
  console.log(startTime);
  console.log(endTime);

  const { spotName, addressLine1, addressLine2, nearestLandmark, pricePerHour } =
    spotInfoState;

  // Setting up min times for timePickers
  let minStartTime = new Date();
  let minEndTime = new Date();

  minStartTime.setTime(minStartTime.getTime() - 60 * 1000);

  if (startTime !== null) {
    minEndTime.setTime(startTime.getTime() + 59 * 60 * 1000);
  }

  // Sorting the slotList
  const sortedSpotList = useMemo(() => {
    const list = [...slotList];

    if (list.length === 0) {
      return [];
    }

    // Sort by Date
    list.sort((availibility1, availibility2) =>
      availibility1.slotDate > availibility2.slotDate ? 1 : -1
    );

    // Sort time slots of each Date
    list.forEach((availibility) => {
      availibility.slots.sort((ts1, ts2) => {
        // First compare by start time
        if (ts1.startTime > ts2.startTime) {
          return 1;
        } else if (ts1.startTime < ts2.startTime) {
          return -1;
        }

        // Else compare by endTime
        if (ts1.endTime < ts2.endTime) {
          return -1;
        } else if (ts1.endTime > ts2.endTime) {
          return 1;
        } else {
          // nothing to split them
          return 0;
        }
      });
    });

    console.log("Spot List Sorted:", list);
    return list;
  }, [slotList]);

  // Spot Info Handler
  const spotInfoHandler = (event) => {
    spotInfoDispatch({ type: event.target.name, value: event.target.value });
  };

  // Add & Delete time handlers
  const addTimeSlotHandler = () => {
    enum Result {
      listEmpty = "List Empty",
      dateNotFound = "Date Not Found!",
      alreadyExist = "Time Slot Already Exists!",
      addedTimeSlot = "Added a time slot to an existing date time slot list.",
      updatedTimeSlot = "Updated a time slot of an existing date time slot list.",
    }

    if (startTime === null || endTime === null) {
      return;
    }

    if (startTimeError.length > 0 || endTimeError.length > 0) {
      return;
    }

    // Preventing overlapping times
    let st = new Date(startTime.setSeconds(0, 0));
    let et = new Date(endTime.setSeconds(0, 0));
    let markedForRemoval = [];
    let list = [...sortedSpotList];
    const formattedDate = formatDate(date);

    function CheckTimeSlot() {
      if (list.length === 0) {
        return Result.listEmpty;
      }

      const filteredAvalibility = list.find(
        (availibility) => availibility.slotDate === formattedDate
      );

      if (!filteredAvalibility) {
        console.log("Data not found!!!");
        return Result.dateNotFound;
      }

      const existingTimeSlots = filteredAvalibility.slots;

      for (let i = 0; i < existingTimeSlots.length; i++) {
        let { startTime: cst, endTime: cet } = existingTimeSlots[i];

        // check if new slot is smallest isoloted slot.
        if (et < cst) {
          // console.log("1");
          if (markedForRemoval.length > 0) {
            return Result.updatedTimeSlot;
          }
          return Result.addedTimeSlot;
        }
        // Move to next time slot if new time slot comes after the current time slot.
        else if (cet < st) {
          // check if new slot is largest isoloted slot.
          if (i === existingTimeSlots.length - 1) {
            return Result.addedTimeSlot;
          }
          continue;
        }
        // check if new slot is in between some existing slot or same as an existing slot
        else if (cst <= st && et <= cet) {
          // console.log("2");
          return Result.alreadyExist;
        }
        // check if new slot completely overlaps an existing slot
        else if (st <= cst && cet <= et) {
          console.log("3");
          markedForRemoval.push(i);
        }
        // check if new slot endTime is in between an existing slot.
        else if (st < cst && cst <= et && et <= cet) {
          // console.log("4");
          markedForRemoval.push(i);
          et = cet;
          return Result.updatedTimeSlot;
        }
        // check if new slot startTime is in between an existing slot.
        else if (cst <= st && st <= cet && cet < et) {
          // console.log("5");
          markedForRemoval.push(i);
          st = cst;
        }
      }
      console.log("Out of the Loop!");

      return Result.updatedTimeSlot;
    }

    const result = CheckTimeSlot();

    const newTimeSlot = {
      startTime: st,
      endTime: et,
    };

    if (result === Result.dateNotFound || result === Result.listEmpty) {
      const newAvailibility = {
        slotDate: formatDate(date),
        slots: [],
      };

      newAvailibility.slots.push(newTimeSlot);

      setSlotList((prevState) => {
        return [...prevState, newAvailibility];
      });
    } else if (result === Result.alreadyExist) {
      setOverlappingError("Time slot already exists.");
      return;
    } else {
      const availability = list.find(
        (availibility) => availibility.slotDate === formattedDate
      );
      let updatedTimeSlots = availability.slots;

      if (result === Result.updatedTimeSlot) {
        console.log("markedForRemoval: ", markedForRemoval);
        if (markedForRemoval.length > 0) {
          updatedTimeSlots = updatedTimeSlots.filter(
            (slot, index) => !markedForRemoval.includes(index)
          );
        }
      }

      updatedTimeSlots.push(newTimeSlot);

      const updatedAvalibilityList = list.map(
        (availability) =>
          availability.slotDate === formattedDate && {
            ...availability,
            slots: updatedTimeSlots,
          }
      );
      setSlotList(updatedAvalibilityList);
    }

    setStartTime(null);
    setEndTime(null);
    setOverlappingError(null);
  };

  const deleteTimeSlotHandler = (slotDate, slotIndex) => {
    let updatedTimeSlots = [...slotList];
    updatedTimeSlots = updatedTimeSlots.find(
      (availibility) => availibility.slotDate === slotDate
    ).slots;

    updatedTimeSlots = updatedTimeSlots.filter((slot, index) => index !== slotIndex);
    console.log(updatedTimeSlots);

    let availabilityList = [...slotList];
    if (updatedTimeSlots.length === 0) {
      availabilityList = availabilityList.filter(
        (availibility) => availibility.slotDate !== slotDate
      );
      setSlotList(availabilityList);
    } else {
      const updatedAvailabilityList = availabilityList.map((availibility) => {
        if (availibility.slotDate === slotDate) {
          return { ...availibility, slots: updatedTimeSlots };
        }
        return availibility;
      });
      setSlotList(updatedAvailabilityList);
    }
  };

  // Form submit Handler
  const onSubmitHandler = (event) => {
    event.preventDefault();

    const addedSpotData = {
      spotName: spotInfoState.spotName,
      addressLine1: spotInfoState.addressLine1,
      addressLine2: spotInfoState.addressLine2,
      nearestLandmark: spotInfoState.nearestLandmark,
      pricePerHour: spotInfoState.pricePerHour,
      availability: slotList,
      location: [currentPosition.lng, currentPosition.lat],
    };
    console.log(addedSpotData);

    if (spotId !== null) {
      console.log("Spot Edited!");
      dispatch(editSpot(spotId, addedSpotData)).then((res) => {
        console.log(res);
        navigate("/seller/mySpots");
      });
    } else {
      console.log("Spot Added!");
      dispatch(addSpot(addedSpotData)).then((res) => {
        navigate("/seller/mySpots");
      });
    }
  };

  // Dynamically creating added slots list
  let availabilityList = sortedSpotList.map((availibility, dateIndex) => {
    const { slotDate, slots } = availibility;

    console.log("DAY", new Date(slotDate).getDay());
    const day =
      WEEKDAYS[new Date(slotDate).getDay()] +
      " " +
      new Date(slotDate).getDate() +
      " " +
      MONTHS[new Date(slotDate).getMonth()];

    const timeSlots = slots.map((slot, slotIndex) => {
      const timeSlotStartTime = convertTimeToString(new Date(slot.startTime));
      const timeSlotEndTime = convertTimeToString(new Date(slot.endTime));

      return (
        <li key={slotIndex}>
          <div className={styles["timeSlotInfo"]}>
            <div className={styles["timeSlotContainer"]}> {timeSlotStartTime} </div>
            <span> -- </span>
            <div className={styles["timeSlotContainer"]}> {timeSlotEndTime} </div>
          </div>
          <Ripple onClick={() => deleteTimeSlotHandler(slotDate, slotIndex)}>
            <ClearSharpIcon />
          </Ripple>
        </li>
      );
    });

    return (
      <li key={dateIndex} className={styles["day"]}>
        <h3>{day}</h3>
        <div></div>
        <ul>{timeSlots}</ul>
      </li>
    );
  });

  // Creating Google Map
  const { geolocation } = navigator;
  const onMarkerDragEnd = useCallback((e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  }, []);

  console.log(currentPosition);

  useEffect(() => {
    console.log("ADD SPOT => useEffect()");

    if (locationState) {
      const currentPosition = {
        lat: locationState.location.coordinates[1],
        lng: locationState.location.coordinates[0],
      };

      spotInfoDispatch({ type: "set_spotInfo", value: locationState });
      setCurrentPosition(currentPosition);
    } else if (geolocation) {
      geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPosition(currentPosition);
      });
    }
  }, [spotInfoDispatch, locationState, geolocation]);

  return (
    <Fragment>
      <div className={styles["wrapper"]}>
        <Header backLink="/seller/mySpots" content={pageName} />
        <div className={styles["content"]}>
          <div className={styles["mapContainer"]}>
            {currentPosition === null && <Loader />}
            {currentPosition !== null && (
              <GMap
                zoom={14}
                markerPosition={currentPosition}
                onDragEnd={onMarkerDragEnd}
                className={styles["gmap"]}
              />
            )}
          </div>
          <form onSubmit={onSubmitHandler} className={styles["form"]}>
            <Input
              label="Spot Name"
              name="spotName"
              type="text"
              placeholder="e.g. My Spot 1"
              className={styles["registerSpot"]}
              onChange={spotInfoHandler}
              value={spotName}
            />
            <Input
              label="Address Line 1"
              name="addressLine1"
              type="text"
              placeholder="e.g. R-44 Saima Arabian Villas"
              className={styles["registerSpot"]}
              onChange={spotInfoHandler}
              value={addressLine1}
            />
            <Input
              label="Address Line 2"
              name="addressLine2"
              type="text"
              placeholder="e.g. Next to Rim Jhim flats"
              className={styles["registerSpot"]}
              onChange={spotInfoHandler}
              value={addressLine2}
            />
            <Input
              label="Nearest Landmark"
              name="nearestLandmark"
              type="text"
              placeholder="e.g. ABC Masjid/Park"
              className={styles["registerSpot"]}
              onChange={spotInfoHandler}
              value={nearestLandmark}
            />
            <Input
              label="Price Per Hour"
              name="pricePerHour"
              type="text"
              placeholder="e.g. 10, 20, 30 ... 100"
              className={styles["registerSpot"]}
              onChange={spotInfoHandler}
              value={pricePerHour}
            />
            <DetailsBox title="availability">
              <div className={styles["addTimeSlot"]}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <div className={styles["pickerWrapper"]}>
                    <div className={styles["calendar"]}>
                      <MobileDatePicker
                        label="Add available Slots for"
                        minDate={new Date()}
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                    <div className={styles["timePickers"]}>
                      <MobileTimePicker
                        className="timePicker"
                        ampm={true}
                        minutesStep={30}
                        maxTime={new Date(0, 0, 0, 23, 1)}
                        minTime={
                          date.getDate() > minStartTime.getDate() ||
                          minStartTime.getTime() >
                            new Date(new Date(minStartTime).setHours(23, 0)).getTime()
                            ? null
                            : minStartTime
                        }
                        label="Start Time"
                        value={startTime}
                        onChange={(newTime) => {
                          setStartTime(newTime);
                        }}
                        onError={(reason, value) => {
                          switch (reason) {
                            case "maxTime":
                              setStartTimeError(
                                `Start time should not be after ${convertTimeToString(
                                  new Date(0, 0, 0, 23, 0)
                                )}`
                              );
                              break;
                            case "minTime":
                              setStartTimeError(
                                `Start time should not be before ${convertTimeToString(
                                  minStartTime
                                )}`
                              );
                              break;
                            default:
                              setStartTimeError("");
                          }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                      <MobileTimePicker
                        className="timePicker"
                        minutesStep={30}
                        disabled={startTime === null ? true : false}
                        minTime={minEndTime}
                        // maxTime={new Date(0, 0, 0, 12)}
                        label="End Time"
                        value={endTime}
                        onChange={(newTime) => {
                          setEndTime(newTime);
                        }}
                        onError={(reason, value) => {
                          switch (reason) {
                            case "minTime":
                              setEndTimeError(
                                `End time should not be before ${convertTimeToString(
                                  minEndTime
                                )}`
                              );
                              break;
                            default:
                              setEndTimeError("");
                          }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </div>
                  </div>
                </LocalizationProvider>

                <p className={styles["timeError"]}> {startTimeError}</p>
                <p className={styles["timeError"]}> {endTimeError}</p>
                <p className={styles["timeError"]}> {overlappingError}</p>

                <Button type="button" size="small" onClick={addTimeSlotHandler}>
                  Add Slot
                </Button>
              </div>
              <div className={styles["addedSlotsBox"]}>
                <h4>Added Slots</h4>
                {availabilityList.length > 0 && (
                  <ul className={styles["addedSlots"]}>{availabilityList}</ul>
                )}
                {availabilityList.length <= 0 && <p> No Slots Added</p>}
              </div>
            </DetailsBox>

            <Button btnClass="primary" className={styles["submitBtn"]}>
              {pageName}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddSpot;
