import style from "./footer.module.scss"

const Footer = () => {
     return (
         <footer className={style.footer}>
             <p>
                 Copyright © <time> {new Date().getFullYear()} </time> CasinoStars. All rights reserved.
             </p>
         </footer>
     );
};

export default Footer;
