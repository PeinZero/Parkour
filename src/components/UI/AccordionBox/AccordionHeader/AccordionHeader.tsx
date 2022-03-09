import { useAppSelector } from "../../../../store/hooks";
import styles from "./AccordionHeader.module.css";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const AccordionHeader = (props) => {
  const isParker = useAppSelector((state) => state.user.currentRoleParker);

  let AccordionHeaderJSX;

  if (isParker) {
    AccordionHeaderJSX = (
      <div className={styles["header"]}>
        <div className={`${styles["avatar"]} ${isParker && styles["Parker"]}`}>
          <DirectionsCarRoundedIcon />
        </div>
        <div className={styles["contentCar"]}>
          <h4>{props.carInfo.carName}</h4>
          <div></div>
          <p>{props.carInfo.color}</p>
          <div></div>
          <p>{props.carInfo.numPlate}</p>
        </div>
      </div>
    );
  } else if(!isParker){
    AccordionHeaderJSX = (
      <div className={styles["header"]}>
        <div className={`${styles["avatar"]} ${!isParker && styles["Seller"]}`}>
          <LocationOnIcon />
        </div>
        <div className={styles["contentSpot"]}>
          <div className={styles["head"]}>
            <h4> {props.spotInfo.spotName}</h4>
            <div></div>
            <p> {`${props.spotInfo.pricePerHour} / hour`}</p>
          </div>
          <p> near {props.spotInfo.nearestLandmark}</p>
        </div>
      </div>
    );
  }

  return AccordionHeaderJSX;
};

export default AccordionHeader;
