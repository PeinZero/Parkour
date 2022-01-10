import { useEffect } from 'react';
import { useAppSelector } from '../../../store/hooks';
import styles from './SpotDetails.module.css';

import DetailsBox from '../../../components/DetailsBox/DetailsBox';
import Header from '../../../components/UI/Header/Header';

const SpotDetails = () => {
    const user = useAppSelector(state => state.user);
    let name, phone, rating;

    name = user.name;
    phone = user.phone;

    if(user.currentRoleParker && user.parker != null){
        rating = user.parker.cumulativeRating;
    }
    else if(user.seller != null){
        rating = user.seller.cumulativeRating
    };
    
    if(rating === -1){
        rating = "N.R";
    }
    
    const spotDetail = {
        address: "House # C26-A, Rim Jhim Flats, Safoora Chowrangi,Next to KESC Society, 2nd Street to the left.",
        nearestLandmark: "Near Safoora Chowrangi",
        price: 20,
        comments: "Enough space for big cars"
    }
 
    return (
        <div className={styles["spotDetails"]}>
            <Header backLink="/" content="Spot Details" className="small"/>
            <br />
            <div className={styles["details"]}>
                <DetailsBox 
                    boxClass="primary" name={name} rating={rating} phone={phone}>
                </DetailsBox>
                <DetailsBox boxClass="location" spotDetail={spotDetail}></DetailsBox>
                <DetailsBox boxName="Availibility"></DetailsBox>
                <DetailsBox boxName="Images"></DetailsBox>
            </div>
        </div>
    )
}

export default SpotDetails
