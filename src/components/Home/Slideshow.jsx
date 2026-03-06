import VideoSlideshow from "/src/assets/video/slideshow.mp4";

const Slideshow = () => {
  return (
    <div className="header container-full">
      <div className="home-slider-wrapper">
        <div id="slider_wrap" className="lcms_is_playing">
          <div className="lcms_wrap lcms_default_theme lcms_zoom-out_fx lcms_already_hovered">
            <div className="lcms_container">
              <div className="lcms_slide lcms_active_slide">
                <div className="lcms_inner">
                  <video src={VideoSlideshow} autoPlay className="w-full h-full object-cover mask-gradient max-h-[70vh]"></video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;