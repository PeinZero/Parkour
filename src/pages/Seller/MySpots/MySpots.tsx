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
            <div className={styles["leftButtons"]}>
              <Button className="delete-icon">
                <DeleteOutlineRoundedIcon />
              </Button>
              <Button className="deactivate"> Deactivate</Button>
            </div>
            <div className={styles["rightButtons"]}>
              <Button className="edit">Edit</Button>
            </div>
          </div>
        </AccordionBox>

        <AccordionBox
          header={<AccordionHeader spotNumber={"2"} location={""} />}
        >
          <div className={styles["accordionDetails"]}>
            <div className={styles["leftButtons"]}>
              <Button className="delete-icon">
                <DeleteOutlineRoundedIcon />
              </Button>
              <Button className="deactivate">Deactivate</Button>
            </div>
            <div>
              <Button className="edit">Edit</Button>
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
            <div>
              <Button className="delete-icon">
                <DeleteOutlineRoundedIcon />
              </Button>
              <Button className="deactivate"> Deactivate</Button>
            </div>
            <div>
              <Button className="edit">Edit</Button>
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
            <div>
              <Button className="delete-icon">
                <DeleteOutlineRoundedIcon />
              </Button>
              <Button className="deactivate"> Deactivate</Button>
            </div>
            <div>
              <Button className="edit">Edit</Button>
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
