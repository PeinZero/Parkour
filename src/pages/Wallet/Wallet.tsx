import { Modal } from "@material-ui/core";
import React, { useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Header from "../../components/UI/Header/Header";
import Input from "../../components/UI/Input/Input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addCredit, getCredit } from "../../store/Wallet/walletActions";

import styles from "./Wallet.module.css";

const Wallet = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const credit = useAppSelector((state) => state.user.credit);
  const dispatch = useAppDispatch();

  const buyCreditHandler = (e) => {
    // e.preventDefault();
    let credit = e.target.amount.value;
    credit = Number(credit);

    dispatch(addCredit({ credit: credit }))
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log("Wallet: useEffect");
    dispatch(getCredit());
  }, []);

  return (
    <div className={styles["wallet-wrapper"]}>
      <Header backLink="/" content="Wallet" />

      <div className={styles["wallet-balance"]}>
        <p>PKR</p>
        <h3>{credit}</h3>
      </div>

      <div className={styles["wallet-buttons"]}>
        <Button btnClass="primary" size="small" onClick={handleOpen}>
          Add Credit
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles["modal"]}>
          <h3>Buy Credits</h3>
          <form onSubmit={buyCreditHandler} className={styles["form"]}>
            <Input
              label="Enter Amount"
              name="amount"
              type="number"
              placeholder="Rs. 100 - Rs. 1000"
            />
            <Button btnClass="primary" size="small">
              Purchase
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Wallet;
