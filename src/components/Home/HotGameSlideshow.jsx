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
        <section className="flex w-full justify-between flex-col mt-4 mb-4">
            <div className="flex w-full justify-between md:pt-2 md:pb-2">
                <div className="font-bold text-lg md:text-xl flex items-center justify-start gap-2 text-bodyText cursor-default">
                    <img className="h-5 w-5 md:h-8 md:w-8" width={32} height={32} src={icon} />
                    <span className="text-nowrap">{title}</span>
                </div>
            </div>
            <div className="w-12 mt-2 border-b-2 border-y-cardDivider mb-4"></div>

            <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6 xl:grid-cols-8">
                {games.slice(0, 8)?.map((game, index) => (
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
        </section>
    );
};

export default HotGameSlideshow;