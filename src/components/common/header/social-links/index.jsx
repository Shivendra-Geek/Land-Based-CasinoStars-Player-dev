import Link from "next/link";
import style from "./social-links.module.scss";
import clsx from "clsx";
import Image from "next/image";

const SocialLinks = ({ links }) => {
     return (
          <nav className={style.navbar}>
               <ul className={style.nav_links}>
                    {links.map((link, index) => {
                         return (
                              <li key={index}>
                                   <Link
                                        href={link.url}
                                        title={link.title}
                                        className={clsx(style.link, style[link.class], "scale-effect")}>
                                        <Image src={link.icon} height={24} width={24} alt={link.title} />
                                   </Link>
                              </li>
                         );
                    })}
               </ul>
          </nav>
     );
};

export default SocialLinks;