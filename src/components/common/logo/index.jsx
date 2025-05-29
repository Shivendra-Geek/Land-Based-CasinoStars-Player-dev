import Image from "next/image";
import Link from "next/link";
import style from "./logo.module.scss";

const Logo = ({ title = "Casino star logo", isClickable = true }) => {
     const image = <Image src='/images/logo/logo-light.svg' width={200} height={200} alt={title} className={style.logo} />;

     return isClickable ? (
          <Link href='/' title={title}>
               {image}
          </Link>
     ) : (
          image
     );
};

export default Logo;
