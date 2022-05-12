import styles from './RequestCard.module.css'

const RequestCard = ({day, status, address, nearestLandmark, time, pricePerHour, onClick}) => {
  return (
    <div className={styles['requestCard']} onClick={onClick}>
      <div className={styles['top']}>
        <div className={styles['headingBox']}>
          <div className={styles['date']}>
            <span className={styles['day']}> {day.date} </span> {day.month},  {day.year}
          </div>
          <div className={`${styles['status']} ${styles[status]}`}>
            {status}
          </div>
        </div>
        <div className={styles['address']}>
          <p>{address.addressLine1}</p>
          <p>{address.addressLine2}</p>
        </div>
        <div className={styles['nearestLandmark']}>
          Near {nearestLandmark}
        </div>
      </div>
      <div className={styles['bottom']}>
      <div className={styles['bottomContent']}>
          <div className={styles['time']}>
            {time.startTime} - {time.endTime}
          </div>
          <div className={styles['price']}>
            <span>{pricePerHour}</span>/hour
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestCard