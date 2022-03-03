import { IonApp } from "@ionic/react";

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

import { useEffect, Fragment, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ParkerHome from "./pages/Parker/ParkerHome/ParkerHome";
import MyCars from "./pages/Parker/MyCars/MyCars";
import AddCar from "./pages/Parker/AddCar/AddCar";
import Home from "./pages/Home/Home";
import Login from "./pages/AuthPages/Login";
import Signup from "./pages/AuthPages/Signup";
import SellerHome from "./pages/Seller/Home/SellerHome";
import Search from "./pages/Search/Search";
import SpotDetails from "./pages/Parker/BookSpot/BookSpot";
import MySpots  from "./pages/Seller/MySpots/MySpots";
import AddSpot from "./pages/Seller/AddSpot/AddSpot";
import Loader from "./components/UI/Loader/Loader";

import { useAppSelector, useAppDispatch } from "./store/hooks";
import { authActions } from "./store/Authentication/authentication";
import { fetchUser } from "./store/User/userActions";
import { logout } from "./store/Authentication/authenticationActions";


const App: React.FC = (props) => {
  console.log("APP RUNNING")
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.authentication.isAuth);
  const currentRoleParker = useAppSelector((state) => state.user.currentRoleParker);

  console.log("AUTH", isAuth);
  console.log("CurrentRoleParker", currentRoleParker);


  const setAutoLogout = useCallback((milliseconds) => {
    setTimeout(() => {
      dispatch(logout());
    }, milliseconds);
  }, [dispatch]);
  
  useEffect(() => {
    console.log("APP => useEffect()");

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
      
    setAutoLogout(remainingTimeInMs);

    dispatch(
      authActions.login({
        isAuth: true,
        token: token,
        userId: userId,
      })
    );
    
    dispatch(fetchUser(userId, token))
  }, [dispatch, setAutoLogout]);

  return (
    <IonApp className="app">
      <Router>
        <Routes>
          <Route path="/" element={
            <Fragment>
              { (isAuth && currentRoleParker === null) && <Loader/>}
              { (isAuth && currentRoleParker === true) && <ParkerHome />}
              { (isAuth && currentRoleParker === false) && <SellerHome />}
              { !isAuth && <Home />}
            </Fragment>
          }/>
            
          <Route path="/login" element={
            <Fragment>
              {isAuth && <Navigate to="/" />}
              {!isAuth && <Login />}
            </Fragment>
          }/>
          <Route path="/signup" element={<Signup/>} />

          <Route path="/search" element={<Search/>} />

          <Route path="/parker/mycars" element={<MyCars/>} />
          <Route path="/parker/registerCar" element={<AddCar/>}/>
          <Route path="/parker/bookspot" element={<SpotDetails/>}/>
          
          <Route path="/seller/mySpots" element={<MySpots />} />
          <Route path="/seller/addSpot" element={<AddSpot />} />
        </Routes>
      </Router>
    </IonApp>
  );
};

export default App;
