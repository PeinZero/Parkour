import Anchor from "../../UI/Anchor/Anchor";
import Ripple from "../../UI/Button/Ripple/Ripple";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import styles from './MenuItem.module.css';

interface MenuItemProps{
  itemName: string,
  icon: any,
  path: string
}

const MenuItem = ({itemName, icon, path}:MenuItemProps) => {
  return (
    <Anchor path={path} className={styles['menuItem']}>
      <Ripple>
        <div>
          {icon}
          <p>{itemName}</p>
        </div>
        <ArrowForwardIosRoundedIcon />
      </Ripple>
    </Anchor>
  )
}

export default MenuItem
