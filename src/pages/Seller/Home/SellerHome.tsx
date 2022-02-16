import { Fragment, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getAllSpotsBySeller } from "../../../store/Spot/spotActions";
import styles from "./SellerHome.module.css";

import SellerMap from "../SellerMap/SellerMap";

import Hamburger from "../../../components/UI/Hamburger/Hamburger";


const SellerHome: React.FC = () => {
  console.log("SELLER HOME RUNNING");
  
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.authentication.token);
  const [data, setData] = useState({});
  
  const setDataHandler = (data) => {
    setData(prevState => {
      return {...prevState, data};
    });
  }


  useEffect(() => {
    dispatch(getAllSpotsBySeller(token))
      .then( data => {
        setDataHandler(data);
      })
  },[]);

  return (
    <Fragment>
      <Hamburger />
       {Object.keys(data).length !== 0 && <div className={styles["map"]}>  <SellerMap model = {data}/>  </div>}
    </Fragment>
  );
};

export default SellerHome;
