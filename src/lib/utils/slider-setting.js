export const sliderSettings = {
     autoplay: {
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
     },
     grabCursor: true,
     speed: 800,
};

const defaultCoverflowEffect = {
     stretch: 0,
     modifier: 1,
     slideShadows: false,
};

export const bannerSliderBreakpoints = {
     1400: {
          slidesPerView: 4,
          coverflowEffect: {
               ...defaultCoverflowEffect,
               rotate: 15,
               depth: 315,
          },
     },
     992: {
          slidesPerView: 3,
          coverflowEffect: {
               ...defaultCoverflowEffect,
               rotate: 20,
               depth: 420,
          },
     },
     575: {
          slidesPerView: 3,
          coverflowEffect: {
               ...defaultCoverflowEffect,
               rotate: 20,
               depth: 410,
          },
     },
     320: {
          slidesPerView: 2,
          coverflowEffect: {
               ...defaultCoverflowEffect,
               rotate: 25,
               depth: 630,
          },
     },
};
