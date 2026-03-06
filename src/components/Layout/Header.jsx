import { useNavigate, useLocation } from "react-router-dom";
import ImgLogo from "/src/assets/img/logo.webp";
import ImgSupport from "/src/assets/svg/support-black.svg";
import ImgHamburger from "/src/assets/svg/hamburger.svg";
import ImgProfile from "/src/assets/svg/profile.svg";

const Header = ({
    isLogin,
    isSlotsOnly,
    userBalance,
    handleLoginClick,
    handleMyProfileClick,
    openSupportModal,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location?.pathname ?? "";

    const navItems = isSlotsOnly === "false"
        ? [
            { path: ["/", "/home"], label: "Home" },
            { path: ["/casino"], label: "Slots" },
            { path: ["/live-casino"], label: "Casino en vivo" },
            { path: ["/sports"], label: "Deportes" },
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

    return (
        <div className="w-full min-h-16 bg-color-nav flex justify-between items-center px-3 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <button className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0">
                    <img src={ImgHamburger} className="text-gray-300" />
                </button>
                <div className="flex-shrink-0">
                    <a onClick={() => navigate("/")} className="router-link-active router-link-exact-active" aria-current="page">
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
    );
};

export default Header;