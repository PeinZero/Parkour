import React, { Fragment, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [OTP, setOTP] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTPBtnStatus, setOTPBtnStatus] = useState(true);

  //Conformation Object Passed back by Firebase after OTP is sent Sucessfully
  const [confirmationResult, setConfirmationResult] = useState(null);

  //This is messing up (not sure how to make this global throughout the component)
  let recaptchaVerifier;

  const navigate = useNavigate();

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
          onSignUpSubmit(response);
          console.log("reCAPTCHA solved, allow signInWithPhoneNumber.");
        },
        defaultCountry: "PK",
      },
      auth
    );
  };

  const onSignUpSubmit = (e) => {
    e.preventDefault();
    configureCaptcha();

    let TempPhoneNumber = phoneNumber;

    //Phone Number Validation and Adding Country Code
    if (TempPhoneNumber.length < 11 || TempPhoneNumber.length > 12) {
      console.log("Invalid Phone Number");
      setOTPBtnStatus(true);
    }

    //Number length can only be 11 only if it starts with 0
    else if (
      TempPhoneNumber.length === 11 &&
      TempPhoneNumber.charAt(0) !== "0"
    ) {
      console.log("Invalid Phone Number");
      setOTPBtnStatus(true);
    } else {
      setOTPBtnStatus(false);
      if (TempPhoneNumber[0] === "0") {
        //Removing 0 from the number
        TempPhoneNumber = TempPhoneNumber.substring(1, TempPhoneNumber.length);
        TempPhoneNumber = "+92" + TempPhoneNumber;
      } else {
        TempPhoneNumber = "+" + TempPhoneNumber;
      }

      // Testing Console Logs (remove if wished)
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
    }
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    confirmationResult
      .confirm(OTP)
      .then((result) => {
        // User signed in successfully.

        //Set User here
        // const user = result.user;
        // CALL Signup POST API Here.
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
        <button type="submit" disabled={OTPBtnStatus}>
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default OTP;
