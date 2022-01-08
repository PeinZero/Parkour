import styles from './Header.module.css';
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Header = (props) => {
    return (
        <div className={`${styles['header']} ${styles[props.className]}`} style={props.style}>
            <Link to={props.backLink} >
                <ArrowBackIosNewIcon/>
            </Link>
            <h1>{props.content}</h1>
        </div>
    )
}

export default Header
