import { useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ImgSlide1 from "/src/assets/img/banner1.jpg";
import ImgMobileSlide1 from "/src/assets/img/mobile-banner1.png";
import ImgMobileSlide2 from "/src/assets/img/banner.jpg";


const CasinoSlideshow = () => {
  const swiperRef = useRef(null);
  const { isMobile } = useOutletContext();
  
  const slides = isMobile ? [
    { id: 0, image: ImgMobileSlide1 },
    { id: 1, image: ImgMobileSlide2 },
  ] : [
    { id: 0, image: ImgSlide1 },
  ];

  return (
    <div className="w-full mb-2">
      <div className="media-carousel w-full overflow-hidden">
        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            type: 'bullets',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
          className="swiper-wrapper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="media-item relative w-full overflow-hidden">
              <img 
                src={slide.image} 
                alt={`Banner ${slide.id + 1}`} 
                className="w-full h-full object-cover mask-gradient max-h-[70vh]" 
                loading="lazy" 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CasinoSlideshow;