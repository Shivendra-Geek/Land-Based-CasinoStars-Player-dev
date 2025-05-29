import { Icon } from "@iconify/react";
import style from "./sort-btn.module.scss"

const SortBtn = ({ children }) => {
     return (
          children && (
               <button className={style.sort_btn}>
                    <span>{children}</span>
                    <Icon icon='uil:sorting' width='20' height='20' />
               </button>
          )
     );
};

export default SortBtn;
