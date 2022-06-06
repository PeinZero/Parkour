import { Link, useNavigate } from "react-router-dom";
import { useIonAlert } from "@ionic/react";

import styles from "./Signup.module.css";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Header from "../../components/UI/Header/Header";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [present] = useIonAlert();

  const setPresent = (errorHeader, errorBody, buttons) => {
    present({
      cssClass: "my-css",
      header: errorHeader,
      message: errorBody,
      buttons: [...buttons],
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    let phoneNumber = e.target.phone.value;
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    if (password === "" || confirmPassword === "") {
      setPresent("Error", "Password can not be empty", ["OK"]);
      return;
    }

    if (password !== confirmPassword) {
      setPresent("Error", "Passwords do not match", ["OK"]);
      return;
    }

    //Removing Spaces and Whitespaces from Number
    phoneNumber = phoneNumber.trim();
    phoneNumber = phoneNumber.replace(/\s/g, "");

    //Removing + from the phone number
    if (phoneNumber.charAt(0) === "+") {
      phoneNumber = phoneNumber.substring(1, phoneNumber.length);
    }

    //Phone Number Validation and Adding Country Code
    if (phoneNumber.length < 11 || phoneNumber.length > 12) {
      setPresent("Error", "Invalid Phone Number", ["OK"]);
      return;
    }
    //Number length can only be 11 only if it starts with 0
    else if (phoneNumber.length === 11 && phoneNumber.charAt(0) !== "0") {
      setPresent("Error", "Invalid Phone Number", ["OK"]);
      return;
    } else {
      if (phoneNumber[0] === "0") {
        //Removing 0 from the number
        phoneNumber = phoneNumber.substring(1, phoneNumber.length);
        phoneNumber = "+92" + phoneNumber;
      } else {
        phoneNumber = "+" + phoneNumber;
      }

      navigate("/otp", {
        state: { phoneNumber, name, email, password, confirmPassword },
      });
    }
  };

  return (
    <div className={styles["signupPage"]}>
      <Header backLink="/" content="Register" />
      <form onSubmit={formSubmitHandler} className={styles["form"]}>
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="Mahad Khalid"
        />
        <Input
          label="Phone Number"
          name="phone"
          type="text"
          placeholder="03158542543"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="mahadzx@gmail.com"
        />
        <Input label="Password" name="password" type="password" />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />

        <Button>Register</Button>
        <p>
          By registering, you agree to Parkour’s{" "}
          <Link className={styles["Link"]} to="">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className={styles["Link"]} to="">
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
