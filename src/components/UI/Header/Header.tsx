import styles from './Header.module.css';
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Header = (props) => {
    let renderedLink = (
        <Link to={props.backLink}>
            <ArrowBackIosNewIcon/>
        </Link>
    )
    if(props.data){
        renderedLink = (
            <div onClick={props.navigateHandler}>
                <ArrowBackIosNewIcon/>
            </div>
        )
    }
    return (
        <div className={`${styles['header']} ${styles[props.className]}`} style={props.style}>
            {renderedLink}
            <h1>{props.content}</h1>
        </div>
    )
}

export default Header
