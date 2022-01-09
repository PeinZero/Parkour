import { Link } from "react-router-dom";
import styles from "./DetailsBox.module.css";

import StarIcon from "@mui/icons-material/Star";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';

import Button from "../UI/Button/Button";


const DetailsBox = (props) => {
    
    let topContent;
    let bottomContent;
    
    if(props.boxClass === "primary"){
        topContent = (
            <div className={styles["primaryTopContent"]}>
                <div className={styles["avatar"]}></div>
                <div className={styles["name"]}> {props.name} </div>
                <div className={styles["rating"]}>
                    <div>{props.rating}</div>
                    { props.rating !== "N.R" && <div className={styles["icon"]}> <StarIcon/> </div> }   
                </div>
                {/* <div className={styles["phoneNumber"]}> {props.phone}</div> */}
            </div>
        )

        bottomContent = (
            <div className={styles["buttons"]}>
                <div className={styles["contact"]}>
                    <Button> <PhoneIcon/> Call </Button>
                    <Button> <MessageIcon/> Message </Button>
                </div>
                <div className={styles["reviews"]}>
                    <Button btnClass="primary"> REVIEWS </Button>
                </div>
            </div>
        )
    }
    else if(props.boxClass === "location"){
        topContent = (
            <div className={styles["otherTopContent"]}>
                <h5>Location and Price</h5>
                <div className={styles["icon"]}>
                     <RoomIcon/>
                     <Link to="#">View on Map</Link> 
                </div>
            </div>
        )
        
        
        const spotInfo = Object.keys(props.spotDetail).map( (k, index) => {
            const infoType = k;
            const info = props.spotDetail[infoType];
            console.log(info);
            
            return (
                <li key={index}> 
                    <div className={styles["infoType"]}>
                        {infoType}
                    </div>
                    <div className={styles["info"]}>
                        {info}
                    </div>
                </li>
            )
        })
        
        console.log(spotInfo);
        
        bottomContent = (
            <>
                <ul className={styles['spotInfo']}>
                    {spotInfo}
                </ul>
            </>
        )
    }
    else{
        topContent = (
            <div className={styles["otherTopContent"]}>
                <h5>{props.boxName}</h5>
            </div>
        )

        bottomContent = (
            <>
                {props.children}
            </>
        )
    }

    return (
        <div className={styles["detailsBox"]}>
            <div className={`${styles["top"]} ${styles[props.boxClass]}`}>
                {topContent}
            </div>
            <div className={styles["bottom"]}>
                {bottomContent}
            </div>
        </div>
    )
}

export default DetailsBox
