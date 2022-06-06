import React from 'react'
import Header from '../../components/UI/Header/Header'

import styles from './Wallet.module.css'


const Wallet = () => {
  return (
    <div className={styles["wallet-wrapper"]}>
            <Header backLink="/" content="Wallet"/>

    </div>
  )
}

export default Wallet