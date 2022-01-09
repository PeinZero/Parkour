import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/Authentication/authenticationActions";

import styles from "./Menu.module.css";

import Anchor from "../UI/Anchor/Anchor";
import Button from "../../components/UI/Button/Button";
import Ripple from "../UI/Button/Ripple/Ripple";

import { SwipeableDrawer } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import RoomIcon from "@mui/icons-material/Room";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import HistoryIcon from "@mui/icons-material/History";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";

interface MenuProps {
  clicked: boolean;
  toggleMenu(): void;
}

const Menu: React.FC<MenuProps> = (props): JSX.Element => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const user = useAppSelector((state) => state.user);
  
  const name = user.name;
  const isParker = user.currentRoleParker;

  let rating;
  if(user.currentRoleParker && user.parker != null){
      rating = user.parker.cumulativeRating;
  }
  else if(user.seller != null){
      rating = user.seller.cumulativeRating
  };
  
  if(rating === -1){
      rating = "N.R";
  }
 
  return (
    <SwipeableDrawer
      onOpen={props.toggleMenu}
      open={props.clicked}
      onClose={props.toggleMenu}
      classes={{
        paper: styles["menu"],
      }}
    >
      <div className={styles["wrapper"]}>
        <div className={styles["header"]}>
          <div className={styles["pic"]}>
            <img src="/images/mahad_profile_pic.jpg" alt="" />
          </div>
          <div className={styles["info"]}>
            <h3>{name}</h3>
            <div>
              <p>Rated</p>
              <p>{rating}</p>
              <StarIcon />
            </div>
          </div>
        </div>
        <div className={styles["content"]}>
          {isParker ? (
            <Anchor path="/parker/registeredCars">
              <Ripple>
                <div>
                  <DirectionsCarRoundedIcon />
                  <p>My Cars</p>
                </div>
                <ArrowForwardIosRoundedIcon />
              </Ripple>
            </Anchor>
          ) : (
            <Anchor path="/seller/mySpots">
              <Ripple>
              <div>
                <RoomIcon />
                <p>My Spots</p>
              </div>
              <ArrowForwardIosRoundedIcon />
              </Ripple>
            </Anchor>
          )}
          <Anchor path="#">
            <Ripple>
              <div>
                <AccountBalanceWalletRoundedIcon />
                <p>Wallet</p>
              </div>
              <ArrowForwardIosRoundedIcon />
            </Ripple>
          </Anchor>
          {isParker ? (
            <Anchor path="#">
              <Ripple>
                <div>
                  <HistoryIcon />
                  <p>Your Past Bookings</p>
                </div>
                <ArrowForwardIosRoundedIcon />
              </Ripple>
            </Anchor>
          ) : (
            <Anchor path="#">
              <Ripple>
                <div>
                  <HistoryIcon />
                  <p>Booking Requests</p>
                </div>
                <ArrowForwardIosRoundedIcon />
              </Ripple>
            </Anchor>
          )}
          <Anchor path="#">
            <Ripple>
              <div>
                <SettingsIcon />
                <p>Settings</p>
              </div>
              <ArrowForwardIosRoundedIcon />
            </Ripple>
          </Anchor>
          <Anchor path="/parker/spotdetails">
            <Ripple>
              <div>
                <NotListedLocationIcon />
                <p>Help</p>
              </div>
              <ArrowForwardIosRoundedIcon />
            </Ripple>
          </Anchor>
        </div>
      </div>
      <div className={styles["footer"]}>
        <Button style={{ width: "80%", margin: "5px 10%" }} onClick={logoutHandler}>
           Logout
        </Button>
        
        {isParker && <Anchor path="#"> <Button btnClass="secondary"> Become a Spot Seller </Button> </Anchor>}
        {!isParker && <Anchor path="#"><Button btnClass="secondary"> Find Parking </Button></Anchor>}

      </div>
    </SwipeableDrawer>
  );
};

export default Menu;
