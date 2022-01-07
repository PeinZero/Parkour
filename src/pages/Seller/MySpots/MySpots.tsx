import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";

import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import styles from "./MySpots.module.css";
import Button from "../../../components/UI/Button/Button";
import Anchor from "../../../components/UI/Anchor/Anchor";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AccordionBox from "../../../components/UI/AccordionBox/AccordionBox";
import AccordionHeader from "../../../components/UI/AccordionBox/AccordionHeader/AccordionHeader";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { arrowDownCircle } from "ionicons/icons";
import {
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";

const KHI = {
  lat: 24.8607,
  lng: 67.0011,
};

const LHR = {
  lat: 31.5204,
  lng: 74.3587,
};

const newHomeSpot = {
  lat: 25.015378516175804,
  lng: 67.0405867900451,
};

const oldHomeSpot = {
  lat: 24.965782195439317,
  lng: 67.06957614937544,
};

const primarySpot = newHomeSpot;

const MySpots = () => {
  return (
    <Fragment>
      {/* <div className={styles["header"]}>
          <Link to="/" className={styles["back"]}>
            {" "}
            <ArrowBackIosNewIcon />
          </Link> */}
      <IonAccordionGroup>
        <IonAccordion value="colors">
          <IonItem slot="header">
            <IonLabel>Colors</IonLabel>
          </IonItem>

          <IonList slot="content">
            <IonItem>
              <IonLabel>Red</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Green</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Blue</IonLabel>
            </IonItem>
          </IonList>
        </IonAccordion>
        <IonAccordion value="shapes">
          <IonItem slot="header">
            <IonLabel>Shapes</IonLabel>
          </IonItem>

          <IonList slot="content">
            <IonItem>
              <IonLabel>Circle</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Triangle</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Square</IonLabel>
            </IonItem>
          </IonList>
        </IonAccordion>
        <IonAccordion value="numbers">
          <IonItem slot="header">
            <IonLabel>Numbers</IonLabel>
          </IonItem>
          <IonList slot="content">
            <IonItem>
              <IonLabel>1</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>2</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>3</IonLabel>
            </IonItem>
          </IonList>
        </IonAccordion>
      </IonAccordionGroup>
    </Fragment>
  );
};

export default MySpots;
