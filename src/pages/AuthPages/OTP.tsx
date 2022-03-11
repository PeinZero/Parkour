import React, { Fragment, useEffect, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./OTP.module.css";
import Button from "../../components/UI/Button/Button";
import Header from "../../components/UI/Header/Header";
import { useIonAlert } from "@ionic/react";
import { useAppDispatch } from "../../store/hooks";
import { sendSignupData } from "../../store/Authentication/authenticationActions";

const OTP = () => {
  const [firstDigit, setFirstDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");
  const [thirdDigit, setThirdDigit] = useState("");
  const [fourthDigit, setFourthDigit] = useState("");
  const [fifthDigit, setFifthDigit] = useState("");
  const [sixthDigit, setSixthDigit] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [present] = useIonAlert();
  const dispatch = useAppDispatch();

  //Conformation Object Passed back by Firebase after OTP is sent Sucessfully
  const [confirmationResult, setConfirmationResult] = useState(null);

  //This is messing up (not sure how to make this global throughout the component)
  let recaptchaVerifier;

  const { state } = location;
  const locationState: any = state;
  let phoneNumber, name, email, password, confirmPassword;

  if (locationState) {
    phoneNumber = locationState.phoneNumber;
    name = locationState.name;
    email = locationState.email;
    password = locationState.password;
    confirmPassword = locationState.confirmPassword;
  }

  // Firebase Requires This function to be called in order to verify if the user is human
  const configureCaptcha = () => {
    const auth = getAuth();

    //Please Make recaptchaVerifier global here
    recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignUpSubmit();
          console.log("reCAPTCHA solved, allow signInWithPhoneNumber.");
        },
        defaultCountry: "PK",
      },
      auth
    );
  };

  const onSignUpSubmit = () => {
    // e.preventDefault();
    configureCaptcha();

    // Testing Console Logs (remove if wished)
    console.log("onSignUpSubmit");
    console.log("Phone Number: ", phoneNumber);

    const appVerifier = recaptchaVerifier;
    const auth = getAuth();
    if (phoneNumber) {
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((_confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          setConfirmationResult(_confirmationResult);
        })
        .catch((error) => {
          // Error; SMS not sent
          console.log("SMS not sent", error);
        });
    }
  };

  const setPresent = (errorHeader, errorBody, buttons) => {
    present({
      cssClass: "my-css",
      header: errorHeader,
      message: errorBody,
      buttons: [...buttons],
      // onDidDismiss: (e) => console.log("did dismiss"),
    });
  };

  useEffect(() => {
    onSignUpSubmit();
  }, []);

  const verifyOTP = (e) => {
    e.preventDefault();

    //OTP Validation
    if (
      firstDigit === "" ||
      secondDigit === "" ||
      thirdDigit === "" ||
      fourthDigit === "" ||
      fifthDigit === "" ||
      sixthDigit === ""
    ) {
      setPresent("Error", "Please Enter All Digits", ["OK"]);
      return;
    }

    //OTP Formating
    let OTP =
      firstDigit +
      secondDigit +
      thirdDigit +
      fourthDigit +
      fifthDigit +
      sixthDigit;

    confirmationResult
      .confirm(OTP)
      .then((result) => {
        dispatch(
          sendSignupData({
            name,
            phone: phoneNumber,
            email,
            password,
            confirmPassword,
          })
        ).then( response => {
          console.log("User Signed Up Sucessfully");
          navigate("/login");
        });
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("Couldn't sign in", error);
      });
  };

  const onChangeHandler = (e) => {
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  return (
    <Fragment>
      <Header backLink="/" content="Confirm Registration" className="small" />
      <div id="sign-in-button"></div>
      <div className={styles["container"]}>
        <h3>Enter your 6 digit code</h3>
        <p>We sent you a 6 digit code at this number {phoneNumber}</p>

        <div className={styles["userInput"]}>
          <input
            className={styles["OTPInput"]}
            type="number"
            id="1"
            value={firstDigit}
            onChange={onChangeHandler}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setFirstDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="2"
            onChange={onChangeHandler}
            value={secondDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setSecondDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="3"
            onChange={onChangeHandler}
            value={thirdDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setThirdDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="4"
            onChange={onChangeHandler}
            value={fourthDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setFourthDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="5"
            onChange={onChangeHandler}
            value={fifthDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setFifthDigit(digit);
            }}
          />
          <input
            className={styles["OTPInput"]}
            type="number"
            id="6"
            onChange={onChangeHandler}
            value={sixthDigit}
            onInput={(e) => {
              let digit = (e.target as HTMLInputElement).value[0];
              setSixthDigit(digit);
            }}
          />
        </div>
        <div className={styles["submit"]}>
          <Button className={styles["ConfirmButton"]} onClick={verifyOTP}>
            Verify
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default OTP;
