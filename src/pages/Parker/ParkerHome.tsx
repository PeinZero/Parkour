import { Fragment, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchUser } from "../../store/User/userActions";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import styles from "./ParkerHome.module.css";
import Map from "../../components/Map/Map";

import Hamburger from "../../components/UI/Hamburger/Hamburger";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";
import { ButtonBase } from "@material-ui/core";
import { SpinningCircles } from "react-loading-icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ParkerHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authentication.userId);
  const token = useAppSelector((state) => state.authentication.token);
  const [expanded, setExpanded] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const expandSearchHandler = () => {
    console.log("Search Clicked");
    setExpanded(true);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        setCoordinates(latLng);
      })
      .catch((error) => console.error("Error", error));
    setAddress(address);
  };

  const searchOptions = {
    componentRestrictions: { country: "pk" },
  };

  useEffect(() => {
    dispatch(fetchUser(userId, token));
  }, []);

  return (
    <Fragment>
      <Hamburger />
      <div
        className={styles["map"]}
        onClick={() => {
          setExpanded(false);
        }}
      >
        {/* <Map /> */}
      </div>
      <div
        className={`${styles["searchBox"]} ${expanded && styles["expanded"]}`}
      >
        <div className={styles["searchTopBox"]}>
          <h4>Where do you want to park?</h4>
          {expanded && <ArrowDropDownIcon />}
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
                    onClick={expandSearchHandler}
                    className={styles["searchBar"]}
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

export default ParkerHome;
