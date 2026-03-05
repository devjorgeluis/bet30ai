import { useContext, useRef } from "react";
import { AppContext } from "../../AppContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ProviderContainer = ({
    categories,
    onProviderSelect,
}) => {
    const { contextData } = useContext(AppContext);
    const swiperRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const providers = categories.filter((cat) => cat.code && cat.code !== "home");

    const handleClick = (e, provider) => {
        e.preventDefault();
        onProviderSelect(provider);
    };

    return (
        <div className="home-providers-nav-wrapper">
            <nav className="providers-nav providers-nav-icons filled-buttons loaded">
                <div className="scrollable-window">
                    <div className="casino-providers">
                        <div className="nav-link-wrapper-parent">
                            <Swiper
                                ref={swiperRef}
                                modules={[Navigation]}
                                spaceBetween={5}
                                slidesPerView={7.8}
                                navigation={{
                                    prevEl: prevRef.current,
                                    nextEl: nextRef.current,
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 4.2 },
                                    1280: { slidesPerView: 7.8 },
                                }}
                                className="swiper-container"
                            >
                                {
                                    providers.map((provider, idx) => {
                                        const imageUrl = provider.image_local
                                            ? `${contextData.cdnUrl}${provider.image_local}`
                                            : provider.image_url;

                                        return (
                                            <SwiperSlide key={idx} className="swiper-slide">
                                                <a className="nav-link-wrapper" onClick={(e) => handleClick(e, provider)}>
                                                    {
                                                        provider.image_local && 
                                                        <img className="provider-img" src={imageUrl} alt={provider.name} title={provider.name} />
                                                    }
                                                </a>
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default ProviderContainer;