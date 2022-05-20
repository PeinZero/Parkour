import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/Authentication/authenticationActions";
import { switchRole } from "../../store/User/userActions";
import { useNavigate } from "react-router-dom";

import styles from "./Menu.module.css";

import Button from "../../components/UI/Button/Button";
import MenuItem from "./MenuItem/MenuItem";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import StarIcon from "@mui/icons-material/Star";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import RoomIcon from "@mui/icons-material/Room";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import HistoryIcon from "@mui/icons-material/History";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

interface MenuProps {
  clicked: boolean;
  toggleMenu(): void;
}

const Menu: React.FC<MenuProps> = ({ clicked, toggleMenu }): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authentication.token);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const switchUserHandler = () => {
    dispatch(switchRole(token)).then(() => {
      navigate("/");
    });
  };

  const user = useAppSelector((state) => state.user);
  const name = user.name;
  const isParker = user.currentRoleParker;

  let rating;
  if (isParker && user.parker != null) {
    rating = user.parker.cumulativeRating;
  } else if (!isParker && user.seller != null) {
    rating = user.seller.cumulativeRating;
  }

  return (
    <SwipeableDrawer
      onOpen={toggleMenu}
      open={clicked}
      onClose={toggleMenu}
      classes={{
        paper: styles["menu"],
      }}>
      <div className={styles["wrapper"]}>
        <div className={styles["header"]}>
          <div className={styles["pic"]}>
            <img src="/images/mahad_profile_pic.jpg" alt="" />
          </div>
          <div className={styles["info"]}>
            <h3>{name}</h3>
            <div>
              {rating === -1 && <p className={styles["nr"]}> Not Rated </p>}
              {rating !== -1 && (
                <>
                  {" "}
                  <p>Rated</p> <p>{rating}</p> <StarIcon />{" "}
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles["content"]}>
          {isParker && (
            <MenuItem
              itemName="My Cars"
              icon={<DirectionsCarRoundedIcon />}
              path="/parker/mycars"
            />
          )}
          {!isParker && (
            <MenuItem itemName="My Spots" icon={<RoomIcon />} path="/seller/mySpots" />
          )}

          <MenuItem itemName="Wallet" icon={<AccountBalanceWalletRoundedIcon />} path="#" />
          <MenuItem
            itemName="Booking Requests"
            icon={<HistoryIcon />}
            path="/bookingRequest"
          />
          <MenuItem itemName="Settings" icon={<SettingsIcon />} path="#" />
          <MenuItem itemName="Help" icon={<NotListedLocationIcon />} path="#" />
          <MenuItem itemName="Chat" icon={<ChatBubbleIcon />} path="/chat" />
        </div>
      </div>

      <div className={styles["footer"]}>
        <Button style={{ width: "80%", margin: "5px 10%" }} onClick={logoutHandler}>
          Logout
        </Button>

        {isParker && (
          <Button btnClass="secondary" onClick={switchUserHandler}>
            {" "}
            Become a Spot Seller{" "}
          </Button>
        )}
        {!isParker && (
          <Button btnClass="primary" onClick={switchUserHandler}>
            {" "}
            Find Parking{" "}
          </Button>
        )}
      </div>
    </SwipeableDrawer>
  );
};

export default Menu;
