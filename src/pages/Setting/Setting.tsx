import { Link, useNavigate } from "react-router-dom";
import { useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./Setting.module.css";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Header from "../../components/UI/Header/Header";

import { updateProfileInfo } from "../../store/User/userActions";
import { userActions } from "../../store/User/user";

const Setting: React.FC = () => {
  const [present] = useIonAlert();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const user = useAppSelector((state) => state.user);

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
    setName(user.name);
    setPhone(user.phone);
    setEmail(user.email);
    setDob(user.dob);
    setGender(user.gender);
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    let phoneNumber = e.target.phone.value;
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let dob = e.target.dob.value;
    let gender = e.target.gender.value;

    console.log(
      phoneNumber,
      name,
      email,
      dob,
      gender,
      password,
      confirmPassword
    );

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
    }

    dispatch(
      updateProfileInfo({
        phone: phoneNumber,
        name,
        email,
        dob,
        gender,
        password,
      })
    ).then((res) => {
      dispatch(userActions.updateUserInfo({
        phone: phoneNumber,
        name,
        email,
        dob,
        gender,
        password,
      }));
    })

  };

  return (
    <div className={styles["signupPage"]}>
      <Header backLink="/" content="Settings" />

      <form onSubmit={formSubmitHandler} className={styles["form"]}>
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="Mahad Khalid"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Phone Number"
          name="phone"
          type="text"
          placeholder="03158542543"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="mahadzx@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          placeholder="Jan 1, 2000"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <Input
          label="Gender"
          name="gender"
          type="text"
          placeholder="Male / Female"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <Input label="Password" name="password" type="password" />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
        />

        <Button>Change Information</Button>
      </form>
    </div>
  );
};
export default Setting;
