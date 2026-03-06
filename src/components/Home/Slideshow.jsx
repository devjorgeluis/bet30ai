import VideoSlideshow from "/src/assets/video/slideshow.mp4";

const Slideshow = () => {
  return (
    <div className="w-full mb-2">
      <div className="media-carousel w-full overflow-hidden">
        <div className="relative w-full">
          <div className="media-item relative w-full overflow-hidden lg:h-[500px]">
            <video 
              src={VideoSlideshow} 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover mask-gradient max-h-[70vh]"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;