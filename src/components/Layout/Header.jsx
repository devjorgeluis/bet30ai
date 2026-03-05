import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Slideshow from "../Home/Slideshow";
import CasinoSlideshow from "../Casino/Slideshow";
import LiveCasinoSlideshow from "../LiveCasino/Slideshow";
import ImgLogo from "/src/assets/img/logo.png";
import ImgHome from "/src/assets/img/home.png";
import ImgCasino from "/src/assets/img/casino.png";
import ImgLiveCasino from "/src/assets/img/live-casino.png";
import ImgSports from "/src/assets/img/sports.png";
import ImgSupport from "/src/assets/svg/support-black.svg";
import ImgProfile from "/src/assets/svg/profile.svg";

const Header = ({
    isLogin,
    isMobile,
    isSlotsOnly,
    userBalance,
    handleLoginClick,
    handleMyProfileClick,
    openSupportModal,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location?.pathname ?? "";
    const dropdownRef = useRef(null);

    const isCasinoPage = location.pathname === "/casino";
    const isLiveCasinoPage = location.pathname === "/live-casino";
    const isSportsPage = location.pathname === "/sports" || location.pathname === "/live-sports";

    const navItems = isSlotsOnly === "false"
        ? [
            { path: ["/", "/home"], label: "INICIO", image: ImgHome },
            { path: ["/casino"], label: "CASINO", image: ImgCasino },
            { path: ["/live-casino"], label: "CASINO EN VIVO", image: ImgLiveCasino },
            { path: ["/sports"], label: "DEPORTES", image: ImgSports },
        ]
        : [
            { path: ["/", "/home"], label: "INICIO", image: ImgHome },
            { path: ["/casino"], label: "CASINO", image: ImgCasino },
        ];

    const isActive = (paths) => {
        if (Array.isArray(paths)) {
            return paths.some((p) =>
                p === "/" ? pathname === "/" : pathname.startsWith(p)
            );
        }
        return pathname.startsWith(paths);
    };

    const formatBalance = (value) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "0,00";
        return num.toLocaleString("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const NavLinks = () => (
        <nav className="main-nav filled-buttons loaded">
            {navItems.map((item, idx) => (
                <a
                    key={idx}
                    className={`nav-link-wrapper${isActive(item.path) ? " active" : ""}`}
                    href={Array.isArray(item.path) ? item.path[0] : item.path}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(Array.isArray(item.path) ? item.path[0] : item.path);
                    }}
                >
                    <img className="main-nav-img" src={item.image} alt={item.label} />
                    <span className="text">{item.label}</span>
                </a>
            ))}
        </nav>
    );

    const BalanceBlock = () => (
        <div className="balance-wrapper">
            <span className="icon-balance"></span>
            <span id="balance" className="balance">
                {formatBalance(userBalance)}
            </span>
        </div>
    );

    return (
        <div className="body-container">
            <div className="body-scrollable">
                {isMobile ? (
                    <>
                        <div className="logo-menu row container-full">
                            <div className="column column-50">
                                <div className="header-left">
                                    <div className="logo">
                                        <a href="/">
                                            <img
                                                title="Logo"
                                                alt="Logo"
                                                src={ImgLogo}
                                                className="max-h-full"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="column column-50 header-right-wrapper">
                                <div className="header-right">
                                    <button className="button-support" onClick={() => { openSupportModal(false); }}>
                                        <img src={ImgSupport} />
                                    </button>
                                    {isLogin ? (
                                        <>
                                            <BalanceBlock />
                                            <div className="burger profile-pic" onClick={() => handleMyProfileClick()}>
                                                <img src={ImgProfile} />
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            className="button button--login"
                                            onClick={handleLoginClick}
                                        >
                                            Iniciar sesión
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <header className="header container-full">
                            <div className="header-wrapper">
                                <NavLinks />
                                {
                                    isCasinoPage ? <CasinoSlideshow /> : isLiveCasinoPage ? <LiveCasinoSlideshow /> : !isSportsPage ? <Slideshow /> : <></>
                                }
                            </div>
                        </header>
                    </>
                ) : (
                    <>
                        <div className="logo-menu row container-full">
                            <div className="column column-50">
                                <div className="header-left">
                                    <div className="logo">
                                        <a href="/">
                                            <img
                                                title="Logo"
                                                alt="Logo"
                                                src={ImgLogo}
                                                className="max-h-full"
                                            />
                                        </a>
                                    </div>
                                    <NavLinks />
                                </div>
                            </div>
                            <div className="column column-50 header-right-wrapper">
                                <div className="header-right">
                                    <button className="button-support" onClick={() => { openSupportModal(false); }}>
                                        <img src={ImgSupport} />
                                    </button>
                                    {isLogin ? (
                                        <>
                                            <BalanceBlock />
                                            <div
                                                className="burger profile-pic"
                                                onClick={() => handleMyProfileClick()}
                                            >
                                                <img src={ImgProfile} />
                                            </div>
                                        </>
                                    ) : (
                                        <button
                                            className="button button--login"
                                            onClick={handleLoginClick}
                                        >
                                            Iniciar sesión
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {
                            isCasinoPage ? <CasinoSlideshow /> : isLiveCasinoPage ? <LiveCasinoSlideshow /> : !isSportsPage ? <Slideshow /> : <></>
                        }
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;