import style from "./slider-btns.module.scss";
import clsx from "clsx";
import Image from "next/image";

const SliderBtns = ({ ref, children, className, arrowWide = "0px" }) => {
     const handleNext = () => {
          if (ref.current && ref.current.swiper) {
               ref.current.swiper.slideNext();
          }
     };

     const handlePrev = () => {
          if (ref.current && ref.current.swiper) {
               ref.current.swiper.slidePrev();
          }
     };

     return (
          children && (
               <div className={clsx(style.slider_btn_wp, className)}>
                    {children}
                    <div className={style.slider_btn}>
                         <div
                              className={clsx(style.btn, style.prev)}
                              style={{ left: `${arrowWide}` }}
                              onClick={handlePrev}>
                              <button className='scale-effect'>
                                   <Image src='/images/icons/left.svg' height={20} width={20} alt='left icon' />
                              </button>
                         </div>
                         <div
                              className={clsx(style.btn, style.next)}
                              style={{ right: `${arrowWide}` }}
                              onClick={handleNext}>
                              <button className='scale-effect'>
                                   <Image src='/images/icons/right.svg' height={20} width={20} alt='right icon' />
                              </button>
                         </div>
                    </div>
               </div>
          )
     );
};

export default SliderBtns;
