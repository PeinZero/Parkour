import { Link, useNavigate } from "react-router-dom";
import { useIonAlert } from "@ionic/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./Setting.module.css";

import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Header from "../../components/UI/Header/Header";

import { changeProfileInfo } from "../../store/Setting/settingActions";

const Setting: React.FC = () => {
  const [present] = useIonAlert();
  const dispatch = useAppDispatch();
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  
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
  }, []);
  

  const formSubmitHandler = (e) => {
    e.preventDefault();

    let phoneNumber = e.target.phone.value;
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    console.log(phoneNumber, name, email, password, confirmPassword);

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

    dispatch(changeProfileInfo({ phoneNumber, name, email, password, confirmPassword }));
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
  export default Setting
