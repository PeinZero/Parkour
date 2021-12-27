import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/Authentication/authenticationActions";

import styles from "./Menu.module.css";

import Anchor from "../UI/Anchor/Anchor";
import Button from "../../components/UI/Button/Button";

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

  const name = useAppSelector((state) => state.user.name);
  const parker = useAppSelector((state) => state.user.parker);
  // const rating = parker.rating;
  const isParker = useAppSelector((state) => state.user.currentRoleParker);

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
              <p>4.2</p>
              <StarIcon />
            </div>
          </div>
        </div>
        <div className={styles["content"]}>
          {isParker ? (
            <Anchor path="/page/registeredCars">
              <div>
                <DirectionsCarRoundedIcon />
                <p>My Cars</p>
              </div>
              <ArrowForwardIosRoundedIcon />
            </Anchor>
          ) : (
            <Anchor path="/seller/mySpots">
              <div>
                <RoomIcon />
                <p>My Spots</p>
              </div>
              <ArrowForwardIosRoundedIcon />
            </Anchor>
          )}
          <Anchor path="#">
            <div>
              <AccountBalanceWalletRoundedIcon />
              <p>Wallet</p>
            </div>
            <ArrowForwardIosRoundedIcon />
          </Anchor>
          {isParker ? (
            <Anchor path="#">
              <div>
                <HistoryIcon />
                <p>Your Past Bookings</p>
              </div>
              <ArrowForwardIosRoundedIcon />
            </Anchor>
          ) : (
            <Anchor path="#">
              <div>
                <HistoryIcon />
                <p>Booking Requests</p>
              </div>
              <ArrowForwardIosRoundedIcon />
            </Anchor>
          )}
          <Anchor path="#">
            <div>
              <SettingsIcon />
              <p>Settings</p>
            </div>
            <ArrowForwardIosRoundedIcon />
          </Anchor>
          <Anchor path="#">
            <div>
              <NotListedLocationIcon />
              <p>Help</p>
            </div>
            <ArrowForwardIosRoundedIcon />
          </Anchor>
        </div>
      </div>
      <div className={`${styles["footer"]} ${!isParker && styles["Seller"]}`}>
        <Button className={"logoutBtn"} onClick={logoutHandler}>
          {" "}
          Logout{" "}
        </Button>
        {isParker ? (
          <Anchor path="#">Become a Spot Seller</Anchor>
        ) : (
          <Anchor style={{ backgroundColor: "red" }} path="#">
            Find Parking
          </Anchor>
        )}
      </div>
    </SwipeableDrawer>
  );
};

export default Menu;
