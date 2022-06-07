import {useState, useEffect, Fragment, useCallback} from 'react'
import { useAppDispatch } from '../../store/hooks';

import Header from '../../components/UI/Header/Header';
import Card from '../../components/UI/Card/Card';
import Loader from '../../components/UI/Loader/Loader'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {initializeSocket} from '../../store/Socket/socketActions';
import {convertTimeToString} from '../../helper/timeFunctions';
import { fetchNotifications } from '../../store/Notifications/Notifications';

import styles from './Notifications.module.css';
import ReactDOM from 'react-dom';


const Notifications = () => {
  console.log("NOTIFICATION RUNNING");
  const defaultNotifications = [
    // {
    //   notification: {
    //     text: "Mahad Khalid sent a booking request for Chase",
    //     target: "Seller",
    //     time: "4:00 PM"
    //   },
    //   from: "Mahad Khalid"
    // }
  ]

  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [socket, setSocket] = useState(null);
  const [alignment, setAlignment] = useState('All');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setLoading(true);
    setAlignment(newAlignment);
  };

  const getNotifications = useCallback((filter) => {
    dispatch(fetchNotifications(filter))
      .then( (fetchedNotifications) => {
        console.log("FN: ", fetchedNotifications);
        ReactDOM.unstable_batchedUpdates( () => {
          console.log("Fetching notifications...");
          setLoading(false);
          setNotifications(fetchedNotifications.reverse())
        });
      })
  },[dispatch])

  const renderedNotifications = notifications.map( (notification, index) => {
    const time = convertTimeToString(new Date(notification.time));
    return(
      <li key={index} className={styles["notification"]}>
        <div className={styles["notificationLeft"]}>
          <h3> 
            {notification.from} 
            {alignment === "All" && <span className={styles[notification.target]}> {notification.target} </span>} 
          </h3>
          <p> {notification.text} </p>
        </div>
        <div className={styles["notificationRight"]}>
          <p> {time} </p>
        </div>

      </li>
    );
  })

  useEffect(() => {
    console.log("Notification => useEffect()");
    dispatch(initializeSocket())
      .then( socket => {
        console.log("Notifications => Socket Created!")
        setSocket(socket);
      })
  }, [dispatch])

  useEffect(() => {
    console.log("Notifications => useEffect() => GetNotifications");
    getNotifications(alignment);
      
  },[alignment, getNotifications]);

  useEffect(() => {
    console.log("Notifications => useEffect() => Socket ON");
    if(socket){
      socket.on("ReceiveNotification", (notification) => {
        setNotifications( (prevState) => [notification, ...prevState])
      })
    }
  }, [socket]);
  

  return (
    <Fragment>
      <Header backLink="/" content="Notifications"/>
      <Card>
        <div className={styles["filter"]}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Parker">Parker</ToggleButton>
            <ToggleButton value="Seller">Seller</ToggleButton>
          </ToggleButtonGroup>
        </div>
        {loading && <Loader screen= {"subScreen"} size={"60"}/>}
        
        { (!loading && notifications.length > 0) &&
            <ul className={styles["notifications"]}>
              {renderedNotifications}
            </ul>
        }
        { (!loading && notifications.length === 0) &&
            <p className={styles["noNotifications"]}>No Notifications available</p>
        }
        
      </Card>
    </Fragment>
  )
}

export default Notifications;