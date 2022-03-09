import React, { Fragment, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const OTP = () => {
  const [OTP, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  let recaptchaVerifier;

  const navigate = useNavigate();

  const configureCaptcha = () => {
    const auth = getAuth();
    recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignUpSubmit(response);
          console.log("reCAPTCHA solved, allow signInWithPhoneNumber.");
          console.log(response);
        },
        defaultCountry: "PK",
      },
      auth
    );
  };

  const onSignUpSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();
    let TempPhoneNumber = "+" + phoneNumber;

    console.log("onSignUpSubmit");
    console.log("Phone Number: ", TempPhoneNumber);
    const appVerifier = recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, TempPhoneNumber, appVerifier)
      .then((_confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        setConfirmationResult(_confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log("SMS not sent", error);
      });
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    confirmationResult
      .confirm(OTP)
      .then((result) => {
        // User signed in successfully.
        // console.log(result);
        // const user = result.user;
        // console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("Couldn't sign in", error);
      });
  };

  return (
    <Fragment>
      <h2>Enter Phone Number</h2>
      <form onSubmit={onSignUpSubmit}>
        <div id="sign-in-button"></div>
        <input
          type="number"
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Enter OTP</h2>
      <form onSubmit={verifyOTP}>
        <input
          type="text"
          placeholder="OTP"
          onChange={(e) => setOTP(e.target.value)}
          value={OTP}
        />
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

export default OTP;
