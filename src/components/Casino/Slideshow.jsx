import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// import ImgSlide1 from "/src/assets/img/banner1.jpg";
// import ImgSlide2 from "/src/assets/img/banner2.jpg";
// import ImgSlide3 from "/src/assets/img/banner3.jpg";
// import ImgSlide4 from "/src/assets/img/banner4.jpg";

const CasinoSlideshow = () => {
  const swiperRef = useRef(null);
  const slides = [
    // { id: 0, image: ImgSlide2 },
    // { id: 1, image: ImgSlide1 },
    // { id: 2, image: ImgSlide3 },
    // { id: 3, image: ImgSlide4 },
  ];

  return (
    <div className="header container-full">
      <div className="home-slider-wrapper">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="swiper-wrapper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="swiper-slide">
              <div id="slider_wrap" className="lcms_is_playing">
                <div className="lcms_wrap lcms_default_theme lcms_zoom-out_fx lcms_already_hovered">
                  <div className="lcms_container">
                    <div className="lcms_slide lcms_active_slide">
                      <div className="lcms_inner">
                        {/* <div className="lcms_bg" style={{ backgroundImage: `url(${slide.image})` }}></div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default CasinoSlideshow;