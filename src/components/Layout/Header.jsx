import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ImgLogo from "/src/assets/img/logo.png";
import ImgSupport from "/src/assets/svg/support-black.svg";
import ImgHamburger from "/src/assets/svg/hamburger.svg";
import ImgProfile from "/src/assets/svg/profile.svg";
import ImgClose from "/src/assets/svg/white-close.svg";
import ImgCasino from "/src/assets/svg/mobile-casino.svg";
import ImgLiveCasino from "/src/assets/svg/mobile-live-casino.svg";
import ImgSports from "/src/assets/svg/mobile-sports.svg";
import ImgLiveSports from "/src/assets/svg/mobile-live-sports.svg";

const Header = ({
    isLogin,
    isSlotsOnly,
    userBalance,
    handleLoginClick,
    handleMyProfileClick,
    supportParent,
    openSupportModal,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location?.pathname ?? "";

    const navItems = isSlotsOnly === "false"
        ? [
            { path: ["/", "/home"], label: "Home" },
            { path: ["/casino"], label: "Slots" },
            { path: ["/live-casino"], label: "Casino en vivo" },
            { path: ["/sports"], label: "Deportes" },
            { path: ["/live-sports"], label: "Deportes en vivo" },
        ]
        : [
            { path: ["/", "/home"], label: "Home" },
            { path: ["/casino"], label: "Slots" },
        ];

    const isActive = (paths) => {
        if (Array.isArray(paths)) {
            return paths.some((p) => {
                if (p === "/") {
                    return pathname === "/" || pathname === "/home";
                }
                return pathname.startsWith(p);
            });
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
        <ul className="relative gap-x-2 lg:gap-x-10 xl:gap-x-20 hidden md:flex items-center justify-center min-w-96">
            {navItems.map((item, idx) => (
                <li
                    key={idx}
                    className={`text-sm text-nowrap rounded-full px-2 lg:px-4 py-2 flex justify-center items-center tracking-wide ${isActive(item.path) && "bg-button"} text-bodyText`}>
                    <a
                        href={Array.isArray(item.path) ? item.path[0] : item.path}
                        className={`${isActive(item.path) ? " router-link-active router-link-exact-active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(Array.isArray(item.path) ? item.path[0] : item.path);
                        }}
                    >
                        {item.label}
                    </a>
                </li>
            ))}
        </ul>
    );

    const MobileSidebar = () => (
        <div className={`bg-color-nav fixed top-0 left-0 h-full w-72 bg-navigationText border-r border-navigationBorder z-1000 overflow-y-auto md:hidden transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex items-center justify-between p-4 border-b border-navigationBorder">
                <img src={ImgLogo} className="h-8 w-auto" alt="Bet30" />
                <button className="p-2 rounded-full hover:bg-cardBackground transition-colors" onClick={() => setSidebarOpen(false)}>
                    <img src={ImgClose} className="text-mainNavigationTextColor" />
                </button>
            </div>
            {
                isSlotsOnly === "false" &&
                <div className="pt-4">
                    <h3 className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase">Deportes</h3>
                    <a onClick={() => { navigate("/sports"); setSidebarOpen(false); }} className={`flex items-center gap-3 px-6 py-3 transition-colors text-white hover:bg-cardBackground ${isActive("/sports") ? "router-link-active router-link-exact-active bg-button" : ""}`}>
                        <img src={ImgSports} className="w-6 h-6" />
                        <span className="text-base">Deportes</span>
                    </a>
                    <a onClick={() => { navigate("/live-sports"); setSidebarOpen(false); }} className={`flex items-center gap-3 px-6 py-3 transition-colors text-white hover:bg-cardBackground ${isActive("/live-sports") ? "router-link-active router-link-exact-active bg-button" : ""}`}>
                        <img src={ImgLiveSports} className="w-6 h-6" />
                        <span className="text-base">En vivo</span>
                    </a>
                </div>
            }
            <div className="pt-4">
                <h3 className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase">Games</h3>
                <a onClick={() => { navigate("/casino"); setSidebarOpen(false); }} className={`flex items-center gap-3 px-6 py-3 transition-colors text-white hover:bg-cardBackground ${isActive("/casino") ? "router-link-active router-link-exact-active bg-button" : ""}`}>
                    <img src={ImgCasino} className="w-6 h-6" />
                    <span className="text-base">Casino</span>
                </a>
                {
                    isSlotsOnly === "false" && 
                    <a onClick={() => { navigate("/live-casino"); setSidebarOpen(false); }} className={`flex items-center gap-3 px-6 py-3 transition-colors text-white hover:bg-cardBackground ${isActive("/live-casino") ? "router-link-active router-link-exact-active bg-button" : ""}`}>
                        <img src={ImgLiveCasino} className="w-6 h-6" />
                        <span className="text-base">En vivo</span>
                    </a>
                }
            </div>
            {
                supportParent && 
                <div className="px-4 py-4">
                    <a rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-button text-bodyText py-3 rounded-lg hover:opacity-90 transition-all" onClick={() => { openSupportModal(true); }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24" fill="currentColor">
                            <g>
                                <path d="M232,128v80a40,40,0,0,1-40,40H136a8,8,0,0,1,0-16h56a24,24,0,0,0,24-24H192a24,24,0,0,1-24-24V144a24,24,0,0,1,24-24h23.65A88,88,0,0,0,66,65.54,87.29,87.29,0,0,0,40.36,120H64a24,24,0,0,1,24,24v40a24,24,0,0,1-24,24H48a24,24,0,0,1-24-24V128A104.11,104.11,0,0,1,201.89,54.66,103.41,103.41,0,0,1,232,128Z"></path>
                            </g>
                        </svg>
                        <span className="font-semibold">Soporte 24/7</span>
                    </a>
                </div>
            }
            <div className="px-4 py-6 border-t border-navigationBorder">
                <img src={ImgLogo} className="h-10 w-auto mx-auto opacity-80" alt="Bet30" />
            </div>
            <div className="px-4 pb-6 text-center">
                <p className="text-xs text-mainNavigationTextColor opacity-60">© 2026 Todos los derechos reservados.</p>
            </div>
        </div>
    )

    return (
        <>
            <div className="w-full min-h-16 bg-color-nav flex justify-between items-center px-3 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <button className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0" onClick={() => setSidebarOpen(true)}>
                        <img src={ImgHamburger} className="text-gray-300" />
                    </button>
                    <div className="flex-shrink-0">
                        <a onClick={() => navigate("/")} className="router-link-active router-link-exact-active bg-button" aria-current="page">
                            <img src={ImgLogo} className="w-[5.5rem] max-h-[170px] md:w-40 md:my-1 contain-content cursor-pointer" alt="Bet30" />
                        </a>
                    </div>
                </div>
                <NavLinks />
                <div className="flex items-center gap-2">
                    <button className="button-support" onClick={() => { openSupportModal(false); }}>
                        <img src={ImgSupport} />
                    </button>
                    {
                        isLogin ?
                            <>
                                <div className="flex items-center justify-center">
                                    <button className="relative p-[1px] rounded-full group bg-button">
                                        <div className="px-3 py-1 md:px-2 bg-provider-color rounded-full group-hover:bg-opacity-90 transition-all duration-300">
                                            <span className="text-bodyText text-sm xl:text-lg text-nowrap font-bold"> $ {formatBalance(userBalance)} </span>
                                        </div>
                                    </button>
                                </div>
                                <div>
                                    <button className="relative p-[1px] rounded-full group bg-button" onClick={() => handleMyProfileClick()}>
                                        <div className="px-2 py-2 bg-provider-color rounded-full group-hover:bg-opacity-90 transition-all duration-300 flex justify-center items-center">
                                            <img src={ImgProfile} className="w-5 h-5 text-white" />
                                        </div>
                                    </button>
                                </div>
                            </> :
                            <button className="px-3 py-2 rounded-full h-full bg-button flex gap-1" onClick={handleLoginClick}>
                                <span className="text-white">Acceder</span>
                                <img src={ImgProfile} className="w-5 h-5 text-white" />
                            </button>
                    }
                </div>
            </div>
            {sidebarOpen && <MobileSidebar />}
        </>
    );
};

export default Header;