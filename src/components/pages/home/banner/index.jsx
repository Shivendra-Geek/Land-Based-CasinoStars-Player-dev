'use client';
import { Container } from '@mantine/core';
import clsx from 'clsx';
import style from './banner.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { sliderImages } from '@/lib/utils/home';
import Image from 'next/image';
import { useRef } from 'react';
import { bannerSliderBreakpoints, sliderSettings } from '@/lib/utils/slider-setting';
import SliderBtns from '@/components/common/slider-btns';
import Link from 'next/link';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useRouter } from 'next/navigation';

const Banner = () => {
    const swiperRef = useRef(null);
    const { lgDevice } = useBreakpoints();
    const router = useRouter();

    return (
        <section className={clsx(style.banner)}>
            <Container>
                {!lgDevice && (
                    <div className={style.banner_btn}>
                        <Link href="/live-casino" title="Live casino" className={clsx(style.btn, 'theme_btn gradient_border scale_effect')}>
                            <span>Live Casino</span>
                        </Link>
                        <Link href="/casino-slots" title="Casino slots" className={clsx(style.btn, 'theme_btn gradient_border scale_effect')}>
                            <span>Casino Slots</span>
                        </Link>
                    </div>
                )}
                <div className={clsx(style.slider, 'home_banner_slider')}>
                    <SliderBtns ref={swiperRef}>
                        <Swiper ref={swiperRef} loop={true} effect={'coverflow'} centeredSlides={true} breakpoints={bannerSliderBreakpoints} {...sliderSettings} modules={[EffectCoverflow, Autoplay]}>
                            {sliderImages.map((data, index) => (
                                <SwiperSlide key={data?.name + index} onClick={() => router.push(`${data?.link}#all-games`)}>
                                    <div className={style.slider_img}>
                                        <Image src={data?.image} height={500} width={500} priority={true} alt="game images" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </SliderBtns>
                </div>
            </Container>
        </section>
    );
};

export default Banner;
