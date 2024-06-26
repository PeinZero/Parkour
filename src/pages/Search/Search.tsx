import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";


import styles from './Search.module.css';

import Header from '../../components/UI/Header/Header';

import SearchIcon from "@mui/icons-material/Search";
import SearchResult from '../../components/SearchResult/SearchResult';


const Search = () => {

    // const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                console.log("Success", latLng);
                navigate('/', {state: latLng})
            })
            .catch((error) => console.error("Error", error));
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
                        debounce={1000}
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