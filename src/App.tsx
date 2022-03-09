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

import { useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/AuthPages/Login";
import Signup from "./pages/AuthPages/Signup";
import Search from "./pages/Search/Search";
import ParkerHome from "./pages/Parker/ParkerHome/ParkerHome";
import MyCars from "./pages/Parker/MyCars/MyCars";
import AddCar from "./pages/Parker/AddCar/AddCar";
import BookSpot from "./pages/Parker/BookSpot/BookSpot";
import SellerHome from "./pages/Seller/Home/SellerHome";
import MySpots from "./pages/Seller/MySpots/MySpots";
import AddSpot from "./pages/Seller/AddSpot/AddSpot";
import SpotDetails from "./pages/Seller/SpotDetails/SpotDetails";
import Loader from "./components/UI/Loader/Loader";

import { useAppSelector, useAppDispatch } from "./store/hooks";
import { authActions } from "./store/Authentication/authentication";
import { fetchUser } from "./store/User/userActions";
import {} from "./store/Authentication/authenticationActions";
import OTP from "./pages/AuthPages/OTP";
import firebase from "./firebaseConfig";

const App: React.FC = (props) => {
  console.log("APP RUNNING");
  let _firebase = firebase;
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.authentication.isAuth);
  const currentRoleParker = useAppSelector(
    (state) => state.user.currentRoleParker
  );

  console.log("AUTH", isAuth);
  console.log("CurrentRoleParker", currentRoleParker);

  useEffect(() => {
    console.log("APP => useEffect()");

    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    const userId = localStorage.getItem("userId");

    if (!token || !expiryDate) {
      return;
    }

    dispatch(
      authActions.login({
        isAuth: true,
        token: token,
        userId: userId,
      })
    );

    dispatch(fetchUser(userId, token));
  }, [dispatch]);

  return (
    <IonApp className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                {isAuth && currentRoleParker === null && <Loader />}
                {isAuth && currentRoleParker === true && <ParkerHome />}
                {isAuth && currentRoleParker === false && <SellerHome />}
                {!isAuth && <Home />}
              </Fragment>
            }
          />

          <Route
            path="/login"
            element={
              <Fragment>
                {isAuth && <Navigate to="/" />}
                {!isAuth && <Login />}
              </Fragment>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />

          <Route path="/search" element={<Search />} />

          <Route path="/parker/mycars" element={<MyCars />} />
          <Route path="/parker/registerCar" element={<AddCar />} />
          <Route path="/parker/bookspot" element={<BookSpot />} />

          <Route path="/seller/mySpots" element={<MySpots />} />
          <Route path="/seller/addSpot" element={<AddSpot />} />
          <Route path="/seller/spotdetails" element={<SpotDetails />} />
        </Routes>
      </Router>
    </IonApp>
  );
};

export default App;
