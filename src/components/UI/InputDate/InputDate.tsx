import styles from "./InputDate.module.css";

const InputDate = (props) => {
  return (
    <form className={styles["slotTime"]}>
    
      <input type="datetime-local" value={props.value} onChange={props.onchange} className={styles["endTime"]}/>

    </form>
  );
}


export default InputDate;