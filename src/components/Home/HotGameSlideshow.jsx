import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import GameCard from '../GameCard';

const HotGameSlideshow = ({ games, name, title, isMobile, icon, link, onGameClick }) => {
    const { contextData } = useContext(AppContext);

    const handleGameClick = (game, isDemo = false) => {
        if (onGameClick) {
            onGameClick(game, isDemo);
        }
    };

    return (
        <div className="games-group-wrapper">
            <div className="games-group-title-wrapper">
                <img className="games-group-emoji" src={icon} />
                <h3 className="games-group-title">{title}</h3>
                <div className="games-group-title-line"></div>
            </div>

            <div className="scrollable-window">
                <div className="games-list-wrapper">
                    <div className="games-list">
                        {games.slice(0, 20)?.map((game, index) => (
                            <GameCard
                                key={`hotcard-${name}-${game.id ?? index}-${index}`}
                                id={game.id}
                                isMobile={isMobile}
                                provider={'Casino'}
                                title={game.name}
                                type="slideshow"
                                imageSrc={game.image_local !== null ? contextData.cdnUrl + game.image_local : game.image_url}
                                onGameClick={() => {
                                    handleGameClick(game);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotGameSlideshow;