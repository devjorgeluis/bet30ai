import { useContext } from 'react';
import { AppContext } from '../AppContext';
import IconPlay from "/src/assets/svg/play.svg";
import IconHeart from "/src/assets/svg/heart.svg";

const GameCard = (props) => {
    const { contextData } = useContext(AppContext);

    const handleGameClick = (e) => {
        e.stopPropagation();

        const gameData = props.game || {
            id: props.id || props.gameId,
            name: props.title,
            image_local: props.imageSrc?.includes(contextData?.cdnUrl)
                ? props.imageSrc.replace(contextData.cdnUrl, '')
                : null,
            image_url: props.imageSrc?.includes(contextData?.cdnUrl)
                ? null
                : props.imageSrc
        };

        if (props.onGameClick) {
            props.onGameClick(gameData);
        }
    };

    return (
        <div
            className="block"
            onClick={handleGameClick}
            data-game-id={props.id || props.gameId}
        >
            <div className="overflow-hidden flex flex-col relative group">
                {/* {props.imageSrc && <img src={props.imageSrc} alt={props.title} className="lazyload" />}
                <div className="card-overlay"></div> */}
                <div className="overflow-hidden flex justify-center items-center relative rounded-xl div-image-container border-2 border-blue-500">
                    <div className="absolute -z-50 -inset-5 bg-borderColor w-[400%] h-[400%]"></div>
                    <div className="rounded-sm w-full h-full">
                        <img
                            loading="lazy"
                            src={props.imageSrc}
                            alt={props.title} 
                            width="400"
                            height="400" 
                            className="img transform group-hover:scale-105 group-hover:blur-[3px] transition-transform duration-500 object-contain w-full h-full rounded-xl"
                        />        
                    </div>
                    <button className="absolute text-bodyText opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <img src={IconPlay} className="w-16 h-16 md:w-20 md:h-20 hover:scale-105 transition-all" />
                    </button>
                    <button className="absolute right-1 top-1 md:right-2 md:top-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        <img src={IconHeart} className="w-5 h-5 md:w-7 md:h-7 bg-provider-color p-1 rounded-full transition-colors duration-200 hover:scale-110 transform text-gray-400" />
                    </button>
                </div>

                <p className="font-thin text-xs text-bodyText md:p-2 md:text-sm py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">
                    {props.title}
                </p>
                {/* <div className="buttons-wrapper">
                    <a className="button button-play">
                        <span className="button-play-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 1000" xmlSpace="preserve">
                                <g>
                                    <path d="M68.2,936.1c0-45.3,0-839.6,0-870.8c0-40.5,41.9-70.6,83.3-46.9c33.2,19,696.1,401.8,752.7,434.5c37.2,21.5,36.5,72.8,0,94.3C863.4,571.3,198,956,149.8,982.8C114.5,1002.3,68.2,980.7,68.2,936.1z"></path>
                                </g>
                            </svg>
                        </span>
                    </a>
                    <div className="demo-and-name">
                        <div className="game-name-wrapper">
                            <h5 className="game-name">{props.title}</h5>
                        </div>
                    </div>
                    <div className="button-favorite">
                        <span className="icon-star-o game-favorite-4613"></span>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default GameCard;