import { Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "./MySpots.module.css";
import Button from "../../../components/UI/Button/Button";
import Anchor from "../../../components/UI/Anchor/Anchor";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccordionBox from "../../../components/UI/AccordionBox/AccordionBox";
import AccordionHeader from "../../../components/UI/AccordionBox/AccordionHeader/AccordionHeader";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MapIcon from "@mui/icons-material/Map";

export const MySpots = () => {
  let price = 100;
  const btnStyle = {
    fontSize: "12px",
  };

  const btnStyle2 = {
    fontSize: "12px",
  };
  return (
    <Fragment>
      <div className={styles["header"]}>
        <Link to="/" className={styles["back"]}>
          {" "}
          <ArrowBackIosNewIcon />{" "}
        </Link>
        <h3>My Spots</h3>
      </div>

      <div className={styles["carList"]}>
        <AccordionBox
          header={
            <AccordionHeader
              spotNumber={"1"}
              location={"R-44 Saima Arabian Villas, Gadap Town, Karachi."}
              price={`RS ${price}/hr`}
            />
          }
        >
          <div className={styles["accordionDetails"]}>
            <div className={styles["map"]}>
              <MapIcon />
              View in map
            </div>
            <div className={styles["buttons"]}>
              <Button className="secondary" style={btnStyle}>
                {" "}
                Disable Spot
              </Button>
              <Button className="delete-icon" style={btnStyle2}>
                <DeleteOutlineRoundedIcon />
              </Button>
            </div>
          </div>
        </AccordionBox>

        <AccordionBox
          header={<AccordionHeader spotNumber={"2"} location={""} />}
        >
          <div className={styles["accordionDetails"]}>
            <div className={styles["map"]}>
              View in map
              <MapIcon />
            </div>
            <div className={styles["buttons"]}>
              <Button className="secondary" style={btnStyle}>
                {" "}
                Disable
              </Button>
              <Button className="delete-icon" style={btnStyle2}>
                <DeleteOutlineRoundedIcon />
              </Button>
            </div>
          </div>
        </AccordionBox>

        <AccordionBox
          header={
            <AccordionHeader
              spotNumber={"3"}
              location={"Smol"}
              price={"RS 1/hr"}
            />
          }
        >
          <div className={styles["accordionDetails"]}>
            <div className={styles["map"]}>
              View
              <MapIcon />
            </div>
            <div className={styles["buttons"]}>
              <Button className="secondary" style={btnStyle}>
                {" "}
                Disable Spot
              </Button>
              <Button className="delete-icon" style={btnStyle2}>
                <DeleteOutlineRoundedIcon />
              </Button>
            </div>
          </div>
        </AccordionBox>

        <AccordionBox
          header={
            <AccordionHeader
              spotNumber={"4"}
              location={"this is medium ?"}
              price={"RS 1000/hr"}
            />
          }
        >
          <div className={styles["accordionDetails"]}>
            <div className={styles["map"]}>
              <MapIcon />
              View
            </div>
            <div className={styles["buttons"]}>
              <Button className="secondary" style={btnStyle}>
                {" "}
                Disable
              </Button>
              <Button className="delete-icon" style={btnStyle2}>
                <DeleteOutlineRoundedIcon />
              </Button>
            </div>
          </div>
        </AccordionBox>
      </div>

      <div className={styles["registerCar"]}>
        <div>
          <Anchor path="/parker/registerCar">
            {" "}
            <AddCircleIcon />{" "}
          </Anchor>
        </div>
      </div>
    </Fragment>
  );
};
