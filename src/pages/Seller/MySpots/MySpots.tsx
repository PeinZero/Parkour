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
import Header from "../../../components/UI/Header/Header";

export const MySpots = () => {
  let price = 100;

  return (
    <Fragment>
      <Header backLink="/" content="My Spots"/>
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
            <div className={styles["leftButtons"]}>
              <Button btnClass="delete-icon" size="small">
                <DeleteOutlineRoundedIcon />
              </Button>
              <Button btnClass="negative-outline" size="small"> Deactivate</Button>
            </div>
            <div className={styles["rightButtons"]}>
              <Button btnClass="primary" size="small">Edit</Button>
            </div>
          </div>
        </AccordionBox>

        <AccordionBox
          header={<AccordionHeader spotNumber={"2"} location={""} />}
        >
          <div className={styles["accordionDetails"]}>
            <div className={styles["leftButtons"]}>
              <Button btnClass="delete-icon" size="small">
                <DeleteOutlineRoundedIcon />
              </Button>
              <Button btnClass="negative-outline" size="small">Deactivate</Button>
            </div>
            <div className={styles["rightButtons"]}>
              <Button btnClass="primary" size="small">Edit</Button>
            </div>
          </div>
        </AccordionBox>
      </div>

      <div className={styles["registerSpot"]}>
        <div>
          <Anchor path="/seller/registerSpot">
            {" "}
            <AddCircleIcon />{" "}
          </Anchor>
        </div>
      </div>
    </Fragment>
  );
};
