import { useNavigate, useOutletContext } from "react-router-dom";

import ImgBanner1 from "/src/assets/img/banner-casino.jpg";
import ImgBanner2 from "/src/assets/img/banner-sportsbook.jpg";
import ImgBanner3 from "/src/assets/img/banner-live-casino.jpg";

const BannerContainer = () => {
    const navigate = useNavigate();
    const { isSlotsOnly } = useOutletContext();

    const banners = isSlotsOnly === "false" ? [
        { name: "Casino", link: "/casino", image: ImgBanner1 },
        { name: "Deportes", link: "/sports", image: ImgBanner2 },
        { name: "Casino en Vivo", link: "/live-casino", image: ImgBanner3 }
    ] : [
        { name: "Casino", link: "/casino", image: ImgBanner1 }
    ];

    return (
        <>
            <hr className="big" />
            <div className="banners-wrapper container-full" id="banners">
                {
                    banners.map((banner, index) => (
                        <a className="banner-wrapper" onClick={() => navigate(banner.link)} key={index}>
                            <img
                                className="lazyload"
                                alt="Casino"
                                src={banner.image}
                            />
                            <div className="button-wrapper">
                                <button className="button">{banner.name}</button>
                            </div>
                        </a>
                    ))
                }
            </div>
        </>
    );
};

export default BannerContainer;