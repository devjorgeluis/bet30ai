import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ImgSlide1 from "/src/assets/img/live-banner1.webp";
import ImgSlide2 from "/src/assets/img/live-banner2.webp";
import ImgSlide3 from "/src/assets/img/live-banner3.webp";
import ImgSlide4 from "/src/assets/img/live-banner4.webp";

const LiveCasinoSlideshow = () => {
  const swiperRef = useRef(null);
  const slides = [
    { id: 0, image: ImgSlide2 },
    { id: 1, image: ImgSlide1 },
    { id: 2, image: ImgSlide3 },
    { id: 3, image: ImgSlide4 },
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

export default LiveCasinoSlideshow;