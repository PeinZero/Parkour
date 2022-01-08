import { Fragment, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { fetchUser } from "../../../store/User/userActions";

import styles from "./SellerHome.module.css";

import Map from "../../../components/Map/Map";
import Button from "../../../components/UI/Button/Button";

import Hamburger from "../../../components/UI/Hamburger/Hamburger";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonBase } from "@material-ui/core";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { SpinningCircles } from "react-loading-icons";

const SellerHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authentication.userId);
  const token = useAppSelector((state) => state.authentication.token);
  const [expanded, setExpanded] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    dispatch(fetchUser(userId, token));
  }, []);

  const expandSearchHandler = () => {
    console.log("Search Clicked");
    setExpanded(true);
  };

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = async (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  const searchOptions = {
    location: new google.maps.LatLng(24.8607, 67.0011),
    radius: 200000,
    types: ["address"],
  };

  return (
    <Fragment>
      <Hamburger />
      <div
        onClick={() => {
          setExpanded(false);
        }}
        className={styles["map"]}
      >
        {/* <Map /> */}
      </div>
      <div
        className={`${styles["searchBox"]} ${expanded && styles["expanded"]}`}
      >
        <div className={styles["searchTopBox"]}>
          <h4>Where do you want to park?</h4>
          <p>Tip: We search for parking spots near the pin you drop</p>
        </div>
        <div className={styles["searchBottomBox"]}>
          <ButtonBase
            onClick={expandSearchHandler}
            className={styles["searchBar"]}
          >
            <div className={styles["searchIcon"]}>
              <SearchIcon />
            </div>
          </ButtonBase>
          <div className={styles["recents"]}>
            <ButtonBase className={styles["recent"]}>
              <div className={styles["icon"]}>
                <RoomIcon />
              </div>
              <div className={styles["location"]}>
                <div className={styles["locationName"]}>Fast</div>
                <div className={styles["locationAddress"]}>
                  Korangi - Karachi - Sindh
                </div>
              </div>
            </ButtonBase>

            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
              searchOptions={searchOptions}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Enter your destination",
                    })}
                  />

                  <div>
                    {loading && (
                      <div>
                        <SpinningCircles />
                      </div>
                    )}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "lightblue"
                          : "red",
                      };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SellerHome;
