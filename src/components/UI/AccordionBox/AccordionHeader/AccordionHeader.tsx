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
        <div className={styles["content"]}>
          <h4>{props.name || "Corolla"}</h4>
          <div></div>
          <p>{props.color || "Black"}</p>
          <div></div>
          <p>{props.numPlate || "ABC-123"}</p>
        </div>
      </div>
    );
  } else {
    AccordionHeaderJSX = (
      <div className={styles["header"]}>
        <div className={`${styles["avatar"]} ${!isParker && styles["Seller"]}`}>
          <LocationOnIcon />
        </div>
        <div className={styles["content"]}>
          <h4>{props.spotNumber || "1"}</h4>
          <div></div>
          <p>
            {props.location || "Nagan Chowrangi, Sector 11-E, North Karachi."}
          </p>

          <p>{props.price || "RS 50/hr"}</p>
        </div>
      </div>
    );
  }

  return AccordionHeaderJSX;
};

export default AccordionHeader;
