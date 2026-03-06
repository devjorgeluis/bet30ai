import { useOutletContext, useNavigate } from "react-router-dom";
import ImgLogo from "/src/assets/img/logo.webp";
import Img18 from "/src/assets/svg/18.svg";

const Footer = () => {
    const navigate = useNavigate();
    const { isSlotsOnly } = useOutletContext();

    return (
        <footer className="bg-gradient-to-t from-background to-secondary/5 text-gray-300 pt-10 pb-28 md:pb-10 border-t border-gray-700">
            <div className="px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
                    <div className="flex justify-center md:justify-start">
                        <div className="grid grid-cols-3 gap-2 text-center md:text-left">
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
                    <div className="flex md:justify-end flex-row items-center gap-4 justify-between">
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
    );
};

export default Footer;
