import { Fragment, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { fetchUser } from "../../../store/User/userActions";

import styles from "./SellerHome.module.css";

import Map from "../../../components/ParkerMap/ParkerMap";

import Hamburger from "../../../components/UI/Hamburger/Hamburger";

const SellerHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authentication.userId);
  const token = useAppSelector((state) => state.authentication.token);

  useEffect(() => {
    dispatch(fetchUser(userId, token));
  }, []);

  return (
    <Fragment>
      <Hamburger />
      <div className={styles["map"]}>{/* <Map /> */}</div>
    </Fragment>
  );
};

export default SellerHome;
