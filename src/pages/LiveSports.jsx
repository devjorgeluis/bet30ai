import { useContext, useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { AppContext } from "../AppContext";
import { callApi } from "../utils/Utils";
import Header from "../components/Layout/Header";
import LoadApi from "../components/Loading/LoadApi";

const LiveSports = () => {
    const pageTitle = "Live Sports";
    const { contextData } = useContext(AppContext);
    const [sportsEmbedUrl, setSportsEmbedUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { isSlotsOnly, isLogin, isMobile, userBalance, supportParent, openSupportModal, handleLoginClick, handleMyProfileClick } = useOutletContext();

    useEffect(() => {
        loadSportsPage();
    }, [location.pathname]);

    const loadSportsPage = () => {
        setIsLoading(true);
        callApi(contextData, "GET", "/get-page?page=sportslive", callbackGetPage, null);
    };

    const callbackGetPage = (result) => {
        if (result.status === 500 || result.status === 422) {
        } else {
            setSportsEmbedUrl(result.data.url_embed);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header
                isLogin={isLogin}
                isMobile={isMobile}
                isSlotsOnly={isSlotsOnly}
                userBalance={userBalance}
                handleLoginClick={handleLoginClick}
                handleMyProfileClick={handleMyProfileClick}
                supportParent={supportParent}
                openSupportModal={openSupportModal}
            />
            {isLoading ? (
                <LoadApi />
            ) : sportsEmbedUrl ? (
                <div className="game-iframe-view_gameIframeWrapper game-iframe-view_sportbook">
                    <iframe
                        src={sportsEmbedUrl}
                        title="Sportsbook"
                        className="game-iframe-view_gameIframe game-iframe-view_sportbook"
                        allowFullScreen
                        loading="lazy"
                        style={{ border: 'none' }}
                    />
                </div>
            ) : (
                <div className="game-iframe-view_gameIframeWrapper game-iframe-view_sportbook">
                    <div className="no-game">
                        <div className="leftWrapper">
                            <p className="forbiddenNumber">
                                403
                            </p>
                            <p className="forbiddenText">
                                Forbidden: Access is denied.
                                Sorry, your location is not covered by our service.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LiveSports;