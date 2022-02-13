import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from  'react-loader-spinner'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles['loader']}>
        <Rings
            height="100"
            width="100"
            color='grey'
            ariaLabel='loading'
        />
    </div>
  )
}

export default React.memo(Loader)