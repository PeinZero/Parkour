import {useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";


import styles from './Search.module.css';

import Header from '../../components/UI/Header/Header';

import SearchIcon from "@mui/icons-material/Search";
import SearchResult from '../../components/SearchResult/SearchResult';


const Search = () => {

    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [suggestions, setSuggestions] = useState([]);

    const handleSelect = (address) => {
        console.log(address);
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
      fields: ['ALL']
    };


    return (
        <div className={styles['searchPage']}>
            <div className={styles['headerMain']}>
                <Header backLink="/" content="Search Parking" className="small" /> 
                <form className={styles['searchInputBar']}>
                    <div className={styles['searchIcon']}>
                        <SearchIcon /> 
                    </div>
                    <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        debounce={2000}
                        searchOptions={searchOptions}
                    >
                        {({
                            getInputProps,
                            suggestions,
                        }) => {
                            if(suggestions.length > 0){
                                console.log(suggestions);
                                setSuggestions(suggestions);
                            }
                            return (
                                <input
                                    className={styles["inputBar"]}
                                    {...getInputProps({ placeholder: "Search for a Location",})}
                                />
                            )
                        }}
                    </PlacesAutocomplete>
                    <select name="cities" id="cities">
                        <option value="karachi">Karachi</option>
                        <option value="lahore">Lahore</option>
                        <option value="islamabad">Islamabad</option>
                    </select>
                </form> 
            </div> 
            { suggestions.length > 0 && <SearchResult resultList={suggestions} selectHandler={handleSelect}/> }
        </div>
    )
}

export default Search


{/* <div>

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
        : "#0090CC",
    };
    return (
        <div {...getSuggestionItemProps(suggestion, { style })}>
        {suggestion.description}
        </div>
    );
    })}
</div>
</div> */}
