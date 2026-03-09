import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import ImgLogo from "/src/assets/img/logo.webp";
import Img18 from "/src/assets/svg/18.svg";
import ImgHome from "/src/assets/svg/mobile-home.svg";
import ImgCasino from "/src/assets/svg/mobile-casino.svg";
import ImgLiveCasino from "/src/assets/svg/mobile-live-casino.svg";
import ImgSports from "/src/assets/svg/mobile-sports.svg";
import ImgLiveSports from "/src/assets/svg/mobile-live-sports.svg";

const Footer = () => {
    const navigate = useNavigate();
    const { isSlotsOnly } = useOutletContext();
    const { pathname } = useLocation();

    return (
        <>
            <footer className="bg-gradient-to-t from-background to-secondary/5 text-gray-300 pt-10 pb-28 md:pb-10 border-t border-gray-700">
                <div className="px-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                        <div className="flex justify-center md:justify-start">
                            <div className="grid gap-2 text-center md:text-left">
                                <div className="px-2">
                                    <ul className="space-y-0">
                                        {isSlotsOnly === "false" ? (
                                            <>
                                                <li>
                                                    <a onClick={() => navigate("/home")} className="hover:text-navigationActiveText transition-colors duration-200 text-sm">
                                                        Home
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={() => navigate("/casino")} className="hover:text-navigationActiveText transition-colors duration-200 text-sm">
                                                        Casino
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={() => navigate("/live-casino")} className="hover:text-navigationActiveText transition-colors duration-200 text-sm">
                                                        Casino en vivo
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={() => navigate("/sports")} className="hover:text-navigationActiveText transition-colors duration-200 text-sm">
                                                        Deportes
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={() => navigate("/live-sports")} className="hover:text-navigationActiveText transition-colors duration-200 text-sm">
                                                        Deportes en vivo
                                                    </a>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <a onClick={() => navigate("/home")} className="hover:text-navigationActiveText transition-colors duration-200 text-sm">
                                                        Home
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={() => navigate("/casino")} className="hover:text-navigationActiveText transition-colors duration-200 text-sm">
                                                        Casino
                                                    </a>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <a onClick={() => navigate("/")}>
                                <img loading="lazy" src={ImgLogo} className="w-44 md:w-64 lg:w-72 h-auto contain-content cursor-pointer text-bodyHighlightText drop-shadow-lg" alt="Bet30" />
                            </a>
                        </div>
                        <div className="flex md:justify-end flex-row items-center gap-4 justify-center">
                            <div className="text-bodyText text-lg font-semibold">
                                <div className="flex justify-between items-center flex-col">
                                    <img src={Img18} className="w-20 h-auto" />
                                    <span className="text-xs mt-4">Solo mayores de 18 años</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-t border-gray-700 mt-8"></div>
                    <div className="text-center text-sm text-gray-400 mt-6 pt-4">
                        <p>© 2026 Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
            <nav className="mobile-footer md:hidden fixed bottom-0 left-0 right-0 z-50 bg-navigationText flex justify-between items-center px-1 min-h-16 pb-safe">
                <ul className="flex gap-5 justify-center items-center w-full h-full min-h-16 list-none m-0 p-0">
                    {isSlotsOnly === "false" ? (
                        <>
                            <li className="w-20 flex justify-center items-center min-h-16 relative">
                                <a onClick={() => navigate("/casino")} className="cursor-pointer no-underline flex flex-col justify-center items-center">
                                    <img src={ImgCasino} className={`w-6 h-6 transition-opacity duration-300 text-mainNavigationTextColor ${pathname === "/casino" ? "active" : ""}`} />
                                    <span className="text-sm text-mainNavigationTextColor">Casino</span>
                                </a>
                            </li>
                            <li className="w-20 flex justify-center items-center min-h-16 relative">
                                <a onClick={() => navigate("/live-casino")} className="cursor-pointer no-underline flex flex-col justify-center items-center">
                                    <img src={ImgLiveCasino} className={`w-6 h-6 transition-opacity duration-300 text-mainNavigationTextColor ${pathname === "/live-casino" ? "active" : ""}`} />
                                    <span className="text-sm text-mainNavigationTextColor">En vivo</span>
                                </a>
                            </li>
                            <li className="w-20 flex justify-center items-center min-h-16 relative">
                                <img src={ImgLogo} alt="Bet30" className="absolute -top-3 effect-logo transition-opacity duration-300 latido" />
                                <a onClick={() => navigate("/")} className="router-link-active router-link-exact-active cursor-pointer no-underline flex flex-col justify-center items-center">
                                    <img src={ImgHome} className={`w-6 h-6 transition-opacity duration-300 text-mainNavigationTextColor ${(pathname === "/" || pathname === "/home") ? "active" : ""}`} />
                                    <span className="text-sm text-mainNavigationTextColor">Inicio</span>
                                </a>
                            </li>
                            <li className="w-20 flex justify-center items-center min-h-16 relative">
                                <a onClick={() => navigate("/sports")} className="cursor-pointer no-underline flex flex-col justify-center items-center">
                                    <img src={ImgSports} className={`w-6 h-6 transition-opacity duration-300 text-mainNavigationTextColor ${pathname === "/sports" ? "active" : ""}`} />
                                    <span className="text-sm text-mainNavigationTextColor">Deportes</span>
                                </a>
                            </li>
                            <li className="w-20 flex justify-center items-center min-h-16 relative">
                                <a onClick={() => navigate("/live-sports")} className="cursor-pointer no-underline flex flex-col justify-center items-center">
                                    <img src={ImgLiveSports} className={`w-6 h-6 transition-opacity duration-300 text-mainNavigationTextColor ${pathname === "/live-sports" ? "active" : ""}`} />
                                    <span className="text-sm text-mainNavigationTextColor">En vivo</span>
                                </a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="w-20 flex justify-center items-center min-h-16 relative">
                                <a onClick={() => navigate("/casino")} className="cursor-pointer no-underline flex flex-col justify-center items-center">
                                    <img src={ImgCasino} className={`w-6 h-6 transition-opacity duration-300 text-mainNavigationTextColor ${pathname === "/casino" ? "active" : ""}`} />
                                    <span className="text-sm text-mainNavigationTextColor">Casino</span>
                                </a>
                            </li>
                            <li className="w-20 flex justify-center items-center min-h-16 relative">
                                <img src={ImgLogo} alt="Bet30" className="absolute -top-3 effect-logo transition-opacity duration-300 latido" />
                            </li>
                            <li className="w-20 flex justify-center items-center min-h-16 relative">
                                <a onClick={() => navigate("/")} className="router-link-active router-link-exact-active cursor-pointer no-underline flex flex-col justify-center items-center">
                                    <img src={ImgHome} className={`w-6 h-6 transition-opacity duration-300 text-mainNavigationTextColor ${(pathname === "/" || pathname === "/home") ? "active" : ""}`} />
                                    <span className="text-sm text-mainNavigationTextColor">Inicio</span>
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default Footer;
