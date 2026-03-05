import { useContext } from 'react';
import { AppContext } from '../AppContext';

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
            className="game"
            onClick={handleGameClick}
            data-game-id={props.id || props.gameId}
        >
            <div className="game-card">
                {props.imageSrc && <img src={props.imageSrc} alt={props.title} className="lazyload" />}
                <div className="card-overlay"></div>
                <div className="buttons-wrapper">
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
                </div>
            </div>
        </div>
    );
};

export default GameCard;