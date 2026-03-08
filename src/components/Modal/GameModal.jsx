import { useState, useEffect, useContext } from "react";
import LoadGame from "../Loading/LoadGame";
import { NavigationContext } from "../Layout/NavigationContext";
import IconClose from "/src/assets/svg/white-close.svg";

const GameModal = (props) => {
  const [url, setUrl] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { setShowFullDivLoading } = useContext(NavigationContext);

  useEffect(() => {
    if (props.gameUrl !== null && props.gameUrl !== "") {
      if (props.isMobile) {
        window.location.href = props.gameUrl;
      } else {
        const container = document.getElementsByClassName("game-view-container")[0];
        if (container) container.classList.remove("d-none");
        setUrl(props.gameUrl);
        // Make the game window visible
        const gameWindow = document.getElementsByClassName("game-window")[0];
        if (gameWindow) gameWindow.classList.remove("d-none");
      }
    }
  }, [props.gameUrl, props.isMobile]);

  // Cleanup when the modal unmounts
  useEffect(() => {
    return () => {
      exitBrowserFullscreen();
      const el = document.getElementsByClassName("game-view-container")[0];
      if (el) {
        el.classList.add("d-none");
        el.classList.remove("fullscreen");
        el.classList.remove("with-background");
      }
      const gameWindow = document.getElementsByClassName("game-window")[0];
      if (gameWindow) gameWindow.classList.add("d-none");
      setUrl(null);
      setIframeLoaded(false);
      setIsFullscreen(false);
    };
  }, []);

  const exitBrowserFullscreen = () => {
    if (
      document.fullscreenElement ||
      document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  };

  const toggleFullScreen = () => {
    const gameWindow = document.getElementsByClassName("game-window")[0];
    const container = document.getElementsByClassName("game-view-container")[0];

    if (!isFullscreen) {
      if (gameWindow.requestFullscreen) gameWindow.requestFullscreen();
      else if (gameWindow.mozRequestFullScreen) gameWindow.mozRequestFullScreen();
      else if (gameWindow.webkitRequestFullscreen) gameWindow.webkitRequestFullscreen();
      else if (gameWindow.msRequestFullscreen) gameWindow.msRequestFullscreen();
      if (container) container.classList.add("fullscreen");
      setIsFullscreen(true);
    } else {
      exitBrowserFullscreen();
      if (container) container.classList.remove("fullscreen");
      setIsFullscreen(false);
    }
  };

  const exitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setIsFullscreen(false);
      const container = document.getElementsByClassName("game-view-container")[0];
      if (container) container.classList.remove("fullscreen");
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
      document.removeEventListener("webkitfullscreenchange", exitHandler);
      document.removeEventListener("mozfullscreenchange", exitHandler);
      document.removeEventListener("MSFullscreenChange", exitHandler);
    };
  }, []);

  const handleIframeLoad = () => {
    if (url != null) {
      const iframe = document.getElementById("game-window-iframe");
      if (iframe) iframe.classList.remove("d-none");
      setIframeLoaded(true);
      setShowFullDivLoading(false);
    }
  };

  const handleIframeError = () => {
    setIframeLoaded(false);
  };

  const internalClose = () => {
    exitBrowserFullscreen();
    setIsFullscreen(false);
    const container = document.getElementsByClassName("game-view-container")[0];
    if (container) container.classList.remove("fullscreen");
    // Hide the game window
    const gameWindow = document.getElementsByClassName("game-window")[0];
    if (gameWindow) gameWindow.classList.add("d-none");
    setUrl(null);
    setIframeLoaded(false);
    if (typeof props.onClose === "function") props.onClose();
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="fixed inset-0 bg-black z-50">
            <div className="h-full flex flex-col">
              <div className="bg-cardBackground border-b border-borderColor px-4 py-3 flex items-center justify-between">
                <h2 className="text-bodyText font-semibold">{props.gameName}</h2>
                <button className="text-bodyText hover:text-red-500 transition-colors">
                  <img src={IconClose} onClick={internalClose} />
                </button>
              </div>
              <div className="flex-1">
                <iframe
                  allow="camera;microphone;fullscreen *"
                  src={url}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  className="w-full h-full border-0"
                  style={{ width: "100%", height: "100%", border: "none" }}
                ></iframe>
                {!iframeLoaded && (
                  <LoadGame />
                )}
              </div>
            </div>
          </div>
          <div className="game-window-header-item align-center">
            <span
              className="close-button"
              onClick={internalClose}
            ></span>
            <span
              className="icon-fullscreen"
              onClick={toggleFullScreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            ></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameModal;