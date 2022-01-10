import { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import styles from "./AddSpot.module.css";

const RegisterSpot = () => {
  const submitForm = (e) => {
    e.preventDefault();
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
          <h1>Register Spot</h1>
        </div>
        <form onSubmit={submitForm} className={styles["form"]}>
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
          <Input
            label="Location"
            name="location"
            type="text"
            placeholder="!(when clicking this map should open)"
            className={styles["registerSpot"]}
          />
          <Input
            label="Images"
            name="imgs"
            type="text"
            placeholder="TODO: images"
            className={styles["registerSpot"]}
          />
          <Input
            label="Mileage (Optional)"
            name="mileage"
            type="text"
            placeholder="e.g. 12"
            className={styles["registerSpot"]}
          />

          <Button style={{ fontSize: "13px" }}>Register Spot</Button>
        </form>
      </div>
    </Fragment>
  );
};

export default RegisterSpot;
