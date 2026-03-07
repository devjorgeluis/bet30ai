import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";

const ProviderContainer = ({
    categories,
    selectedProvider,
    onProviderSelect,
}) => {
    const location = useLocation();
    const isCasino = location.pathname === "/casino" || location.pathname === "/live-casino";
    
    const { contextData } = useContext(AppContext);
    const providers = categories.filter((cat) => cat.code && cat.code !== "home");

    const handleClick = (e, provider) => {
        e.preventDefault();
        onProviderSelect(provider);
    };

    
    return (
        <div className="py-1 w-full md:w-auto md:flex-1">
            {
                !isCasino && 
                <div className="flex gap-2 items-center pb-3 pt-2">
                    <div>
                        <svg fill="white" viewBox="0 0 96 96" width="20" height="20"><title></title><path fillRule="evenodd" clipRule="evenodd" d="M48.117 24.078c6.648 0 12.04-5.391 12.04-12.039S54.764 0 48.116 0C41.47 0 36.078 5.391 36.078 12.039s5.391 12.039 12.04 12.039ZM3.594 50.246l40.003 18.4a10.33 10.33 0 0 0 4.32.933 10.41 10.41 0 0 0 4.387-.96l-.066.027 40.003-18.4a2.608 2.608 0 0 0 1.509-2.362 2.597 2.597 0 0 0-1.494-2.352l-.015-.006-39.445-18.16v16.36a4.8 4.8 0 0 1-4.8 4.8 4.8 4.8 0 0 1-4.801-4.8v-16.36L3.59 45.526a2.608 2.608 0 0 0-1.509 2.361c0 1.041.612 1.939 1.494 2.353l.015.006h.003Zm40.403 28.922L2.074 60.206V72.82c0 1.932 1.134 3.6 2.772 4.377l.03.012L44 95.13c1.173.55 2.55.87 4 .87 1.449 0 2.826-.32 4.059-.893l-.06.024 39.124-17.92c1.668-.79 2.799-2.458 2.799-4.39V60.206L51.999 79.168a9.305 9.305 0 0 1-4 .888 9.365 9.365 0 0 1-4-.889l.001-.002-.057-.024.055.026v.001Z"></path></svg>
                    </div>
                    <h2 className="text-lg sm:text-2xl text-bodyText">Proveedores</h2>
                </div>
            }

            <div className="flex gap-2 pt-1 sm:gap-4 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-thin md:scrollbar-track-purple-900/10 md:scrollbar-thumb-purple-600/50 hover:scrollbar-thumb-purple-600/70">
                {
                    providers.map((provider, idx) => {
                        const imageUrl = provider.image_local
                            ? `${contextData.cdnUrl}${provider.image_local}`
                            : provider.image_url;

                        return (
                            <a
                                key={idx}
                                className={`flex-shrink-0 relative rounded-full overflow-hidden transition-all duration-400 snap-start group bg-provider-color ${
                                    selectedProvider && selectedProvider.id === provider.id ? "bg-button" : ""
                                }`}
                                onClick={(e) => handleClick(e, provider)}
                            >
                                {
                                    provider.image_local &&
                                    <div className="w-[100px] h-[40px] md:w-[120px] sm:h-[50px] relative flex items-center justify-center px-2 py-1 transition-all">
                                        <img
                                            className="max-w-full max-h-full object-contain transition-all duration-300"
                                            src={imageUrl}
                                            alt={provider.name}
                                            title={provider.name}
                                            width={120}
                                            height={50}
                                        />
                                    </div>
                                }
                            </a>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ProviderContainer;