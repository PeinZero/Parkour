import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Rings } from  'react-loader-spinner'
import styles from './Loader.module.css'

interface Props{
  size?: string,
  screen?: string
}

const Loader = (props:Props) => {
  console.log("LOADER RUNNING")
  let size = props.size || "100";

  return (
    <div className={`${styles['loader']} ${styles[props.screen]}`}>
        <Rings
            height={size}
            width={size}
            color='grey'
            ariaLabel='loading'
        />
    </div>
  )
}

export default React.memo(Loader);