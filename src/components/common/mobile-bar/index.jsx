import style from "./mobile-bar.module.scss";
import Links from "../header/links";
import { headerPageLinks } from "@/lib/utils/header";

const MobileBar = () => {
     return (
          <div className={style.mobile_bar}>
               <Links links={headerPageLinks} />
          </div>
     );
};

export default MobileBar;
