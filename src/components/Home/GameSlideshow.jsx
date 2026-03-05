import { useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from '../../AppContext';
import GameCard from '../GameCard';

const GameSlideshow = ({ games, title, onGameClick, slideshowKey, loadMoreContent }) => {
    const { contextData } = useContext(AppContext);

    const handleGameClick = (game, isDemo = false) => {
        if (onGameClick) {
            onGameClick(game, isDemo);
        }
    };

    return (
        <div className="games-group-wrapper">
            <div className="games-group-title-wrapper">
                <h3 className="games-group-title">{title}</h3>
                <div className="games-group-title-line"></div>
                <a className="games-group-view-all" onClick={loadMoreContent}>Ver Mas &gt;</a>
            </div>

            <div className="scrollable-window">
                <div className="games-list-wrapper">
                    <div className="games-list">
                        {games?.map((game, index) => {
                            const keyBase = slideshowKey ? `s${slideshowKey}` : `global`;
                            const itemKey = `${keyBase}-${game.id}-${index}`;
                            return (
                                <GameCard
                                    key={itemKey}
                                    id={game.id}
                                    provider={'Casino'}
                                    title={game.name}
                                    imageSrc={game.image_local !== null ? contextData.cdnUrl + game.image_local : game.image_url}
                                    onGameClick={() => handleGameClick(game)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameSlideshow;