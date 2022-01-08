import styles from './Search.module.css';

import Header from '../../components/UI/Header/Header';

import SearchIcon from "@mui/icons-material/Search";
import SearchResult from '../../components/SearchResult/SearchResult';

const Search = () => {
    const options = [
        { value: 'chocolate', label: 'Karachi' },
        { value: 'strawberry', label: 'Lahore' },
        { value: 'vanilla', label: 'Islamabad' }
    ]

    const result = [
        {name: "Millennium Mall", address: "hellooooooooooo"},
        {name: "Millennium Mall", address: "hellooooooooooo"},
        {name: "Millennium Mall", address: "hellooooooooooo"},
        {name: "Millennium Mall", address: "hellooooooooooo"}
    ]

    return (
        <div className={styles['wrapper']}>
            <div className={styles['headerMain']}>
                <Header backLink="/" content="Search Parking" className="small" 
                    style={{margin: "40px 0 20px 0"}}
                /> 
                <form className={styles['searchInputBar']}>
                    <div className={styles['searchIcon']}>
                        <SearchIcon /> 
                    </div>
                    <input className={styles['inputBar']} placeholder="Search for a Location"/> 
                    <select name="cities" id="cities">
                        <option value="karachi">Karachi</option>
                        <option value="lahore">Lahore</option>
                        <option value="islamabad">Islamabad</option>
                    </select>
                </form> 
            </div> 
            <SearchResult resultList={result} /> 
        </div>
    )
}

export default Search
