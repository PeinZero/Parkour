import { Fragment} from "react";

import styles from "./ParkerHome.module.css";

import ParkerMap from "../../../components/ParkerMap/ParkerMap";
import Hamburger from "../../../components/UI/Hamburger/Hamburger";
import Anchor from "../../../components/UI/Anchor/Anchor";
import Ripple from "../../../components/UI/Button/Ripple/Ripple";

import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";


const ParkerHome: React.FC = () => {
  return (
    <Fragment>
      {/* {console.log(coordinates)} */}
      <Hamburger />
      <div className={styles["map"]}>
        <ParkerMap />
      </div>
      <div
        className={styles["searchBox"]}
      >
        <div className={styles["searchTopBox"]}>
          <h4>Where do you want to park?</h4>
          <p>Tip: We search for parking spots near the pin you drop</p>
        </div>
        <div className={styles["searchBottomBox"]}>
          <Anchor path="/search" className={styles["searchBar"]}>
            <Ripple>
              <div className={styles["searchIcon"]}>
                <SearchIcon />
              </div>
              <div>Enter your destination</div>
            </Ripple>
          </Anchor>
          <div className={styles["recents"]}>
            <Ripple className={styles["recent"]}>
              <div className={styles["icon"]}>
                <RoomIcon />
              </div>
              <div className={styles["location"]}>
                <div className={styles["locationName"]}>Fast</div>
                <div className={styles["locationAddress"]}>
                  Korangi - Karachi - Sindh
                </div>
              </div>
            </Ripple>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ParkerHome;
