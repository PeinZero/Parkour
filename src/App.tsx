import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { useState, useEffect } from "react";

import Menu from "./components/Menu/Menu";
import ParkerHome from "./pages/Parker/ParkerHome";
import RegisteredCars from "./pages/Parker/RegisteredCars";
import RegisterCar from "./pages/Parker/RegisterCar";
import Home from "./pages/Home/Home";
import Login from "./pages/AuthPages/Login";
import Signup from "./pages/AuthPages/Signup";
import SellerHome from "./pages/Seller/Home/SellerHome";

import { useAppSelector, useAppDispatch } from "./store/hooks";
import { authActions } from "./store/Authentication/authentication";
import { userActions } from "./store/User/user";
import { logout } from "./store/Authentication/authenticationActions";
import { MySpots } from "./pages/Seller/MySpots/MySpots";

const App: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.authentication.isAuth);
  const currentRoleParker = useAppSelector(
    (state) => state.user.currentRoleParker
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      dispatch(logout());
      return;
    }

    const userId = localStorage.getItem("userId");
    const remainingTimeInMs =
      new Date(expiryDate).getTime() - new Date().getTime();

    console.log(userId);

    dispatch(
      authActions.login({
        isAuth: true,
        token: token,
        userId: userId,
      })
    );

    setAutoLogout(remainingTimeInMs);
  });

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      dispatch(logout());
    }, milliseconds);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              {isAuth && currentRoleParker && <ParkerHome />}
              {isAuth && !currentRoleParker && <SellerHome />}
              {!isAuth && <Home />}
            </Route>
            <Route path="/page/login" exact={true}>
              {isAuth && <Redirect to="/" />}
              {!isAuth && <Login />}
            </Route>
            <Route path="/page/signup" exact={true}>
              <Signup />
            </Route>
            <Route path="/page/registeredCars" exact={true}>
              <RegisteredCars />
            </Route>
            <Route path="/page/registerCar" exact={true}>
              <RegisterCar />
            </Route>
            <Route path="/seller/mySpots" exact={true}>
              <MySpots />
            </Route>
            <Redirect to="/" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
