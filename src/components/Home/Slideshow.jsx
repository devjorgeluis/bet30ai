import ImgSlideshow from "/src/assets/img/banner.jpg";

const Slideshow = () => {
  return (
    <div className="w-full mb-2">
      <div className="media-carousel w-full overflow-hidden">
        <div className="relative w-full">
          <div className="media-item relative w-full overflow-hidden lg:h-[500px]">
            <img 
              src={ImgSlideshow} 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-auto mask-gradient"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;