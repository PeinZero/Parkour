import { Link } from "react-router-dom";
import styles from "./DetailsBox.module.css";

import StarIcon from "@mui/icons-material/Star";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";

import Button from "../UI/Button/Button";

const DetailsBox = (props) => {
  let topContent;
  let bottomContent;

  if (props.boxClass === "primary") {
    topContent = (
      <div className={styles["primaryTopContent"]}>
        <div className={styles["avatar"]}>
          <img src="/images/mahad_profile_pic.jpg" alt="" />
        </div>
        <div className={styles["name"]}> {props.name}</div>
        <div className={styles["seperator"]}> &bull; </div>
        <div className={styles["rating"]}>
          <div>{props.rating}</div>
          {props.rating !== "Not Rated" && (
            <div className={styles["icon"]}>
              {" "}
              <StarIcon />{" "}
            </div>
          )}
        </div>
      </div>
    );

    bottomContent = (
      <div className={styles["buttons"]}>
        <div className={styles["contact"]}>
          <Button>
            {" "}
            <PhoneIcon /> Call{" "}
          </Button>
          <Button onClick={props.openChat}>
            {" "}
            <MessageIcon /> Message{" "}
          </Button>
        </div>
        <div className={styles["reviews"]}>
          <Button btnClass="primary" onClick={props.viewReviews}>
            {" "}
            REVIEWS{" "}
          </Button>
        </div>
      </div>
    );
  } else {
    topContent = (
      <div className={styles["otherTopContent"]}>
        <h5>{props.title}</h5>
        {props.icon && (
          <div className={styles["icon"]}>
            {props.icon}
            <Link to={props.iconLink}>{props.iconText}</Link>
          </div>
        )}
      </div>
    );
    bottomContent = <>{props.children}</>;
  }

  return (
    <div className={styles["detailsBox"]}>
      <div className={`${styles["top"]} ${styles[props.boxClass]}`}>{topContent}</div>
      <div className={`${styles["bottom"]} ${props.className}`}>{bottomContent}</div>
    </div>
  );
};

export default DetailsBox;
