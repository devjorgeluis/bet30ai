import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { AppContext } from "../AppContext";
import { NavigationContext } from "../components/Layout/NavigationContext";
import { callApi } from "../utils/Utils";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import CasinoSlideshow from "../components/Casino/Slideshow";
import GameSlideshow from "../components/Home/GameSlideshow";
import GameCard from "/src/components/GameCard";
import GameModal from "../components/Modal/GameModal";
import CategoryContainer from "../components/CategoryContainer";
import ProviderContainer from "../components/ProviderContainer";
import SearchInput from "../components/SearchInput";
import LoadApi from "../components/Loading/LoadApi";

let selectedGameId = null;
let selectedGameType = null;
let selectedGameLauncher = null;
let selectedGameName = null;
let selectedGameImg = null;
let pageCurrent = 0;

import ImgCategoryHome from "/src/assets/svg/home.svg";
import ImgCategoryPopular from "/src/assets/svg/popular.svg";
import ImgCategoryBlackjack from "/src/assets/svg/joker.svg";
import ImgCategoryRoulette from "/src/assets/svg/roulette.svg";
import ImgCategoryCrash from "/src/assets/svg/crash.svg";
import ImgCategoryMegaways from "/src/assets/svg/megaway.svg";

const Casino = () => {
  const pageTitle = "Casino";
  const { contextData } = useContext(AppContext);
  const { setShowFullDivLoading } = useContext(NavigationContext);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [txtSearch, setTxtSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [games, setGames] = useState([]);
  const [firstFiveCategoriesGames, setFirstFiveCategoriesGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const [categoryType, setCategoryType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [pageData, setPageData] = useState({});
  const [gameUrl, setGameUrl] = useState("");
  const [shouldShowGameModal, setShouldShowGameModal] = useState(false);
  const [mobileShowMore, setMobileShowMore] = useState(false);
  const [isSingleCategoryView, setIsSingleCategoryView] = useState(false);
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const refGameModal = useRef();
  const location = useLocation();
  const { isSlotsOnly, isLogin, isMobile, userBalance, supportParent, openSupportModal, handleLoginClick, handleMyProfileClick } = useOutletContext();
  const lastLoadedTagRef = useRef("");
  const pendingCategoryFetchesRef = useRef(0);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!location.hash || tags.length === 0) return;
    const hashCode = location.hash.replace('#', '');
    const tagIndex = tags.findIndex(t => t.code === hashCode);

    if (tagIndex !== -1 && selectedCategoryIndex !== tagIndex) {
      setSelectedCategoryIndex(tagIndex);
      setIsSingleCategoryView(false);
      getPage(hashCode);
    }
  }, [location.hash, tags]);

  useEffect(() => {
    selectedGameId = null;
    selectedGameType = null;
    selectedGameLauncher = null;
    selectedGameName = null;
    selectedGameImg = null;
    setGameUrl("");
    setShouldShowGameModal(false);
    setActiveCategory({});
    setIsSingleCategoryView(false);
    getPage("casino");
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const isSlotsOnlyFalse = isSlotsOnly === false || isSlotsOnly === "false";
    let tmpTags = isSlotsOnlyFalse
      ? [
        { name: "Lobby", code: "home", image: ImgCategoryHome },
        { name: "Favoritos", code: "hot", image: ImgCategoryPopular },
        { name: "Jokers", code: "joker", image: ImgCategoryBlackjack },
        { name: "Ruletas", code: "roulette", image: ImgCategoryRoulette },
        { name: "Crash", code: "arcade", image: ImgCategoryCrash },
        { name: "Megaways", code: "megaways", image: ImgCategoryMegaways },
      ]
      : [
        { name: "Lobby", code: "home", image: ImgCategoryHome },
        { name: "Favoritos", code: "hot", image: ImgCategoryPopular },
        { name: "Jokers", code: "joker", image: ImgCategoryBlackjack },
        { name: "Megaways", code: "megaways", image: ImgCategoryMegaways },
      ];

    setTags(tmpTags);
  }, [isSlotsOnly]);

  const getPage = (page) => {
    setIsLoadingGames(true);
    setShowFullDivLoading(true);
    setGames([]);
    setFirstFiveCategoriesGames([]);
    setIsSingleCategoryView(false);
    callApi(contextData, "GET", "/get-page?page=" + page, (result) => callbackGetPage(result, page), null);
  };

  const callbackGetPage = (result, page) => {
    if (result.status === 500 || result.status === 422) {
      setIsLoadingGames(false);
      setShowFullDivLoading(false);
    } else {
      setCategoryType(result.data.page_group_type);
      setSelectedProvider(null);
      setPageData(result.data);

      const hashCode = location.hash.replace('#', '');
      const tagIndex = tags.findIndex(t => t.code === hashCode);
      setSelectedCategoryIndex(tagIndex !== -1 ? tagIndex : 0);

      if (result.data && result.data.page_group_type === "categories" && result.data.categories && result.data.categories.length > 0) {
        setCategories(result.data.categories);
        if (page === "casino") {
          setMainCategories(result.data.categories);
        }
        const firstCategory = result.data.categories[0];
        setActiveCategory(firstCategory);

        const firstFiveCategories = result.data.categories.slice(0, 5);
        if (firstFiveCategories.length > 0) {
          setFirstFiveCategoriesGames([]);
          pendingCategoryFetchesRef.current = firstFiveCategories.length;
          setShowFullDivLoading(true);
          firstFiveCategories.forEach((item, index) => {
            fetchContentForCategory(item, item.id, item.table_name, index, true, result.data.page_group_code);
          });
        }
      } else if (result.data && result.data.page_group_type === "games") {
        setIsSingleCategoryView(true);
        setCategories(mainCategories.length > 0 ? mainCategories : []);
        const gamesWithImages = (result.data.categories || []).map((game) => ({
          ...game,
          imageDataSrc: game.image_local !== null
            ? contextData.cdnUrl + game.image_local
            : game.image_url,
        }));

        setGames(gamesWithImages);
        setActiveCategory(tags[tagIndex] || { name: page });
        pageCurrent = 1;
      }

      setShowFullDivLoading(false);
      setIsLoadingGames(false);
    }
  };

  const fetchContentForCategory = (category, categoryId, tableName, categoryIndex, resetCurrentPage, pageGroupCode = null) => {
    const pageSize = 12;
    const groupCode = pageGroupCode || pageData.page_group_code;
    const apiUrl =
      "/get-content?page_group_type=categories&page_group_code=" +
      groupCode +
      "&table_name=" +
      tableName +
      "&apigames_category_id=" +
      categoryId +
      "&page=0&length=" +
      pageSize +
      (selectedProvider && selectedProvider.id ? "&provider=" + selectedProvider.id : "");

    callApi(contextData, "GET", apiUrl, (result) => callbackFetchContentForCategory(result, category, categoryIndex), null);
  };

  const callbackFetchContentForCategory = (result, category, categoryIndex) => {
    if (result.status === 500 || result.status === 422) {
      pendingCategoryFetchesRef.current = Math.max(0, pendingCategoryFetchesRef.current - 1);
      if (pendingCategoryFetchesRef.current === 0) {
        setShowFullDivLoading(false);
      }
    } else {
      const content = result.content || [];
      configureImageSrc(result);

      const gamesWithImages = content.map((game) => ({
        ...game,
        imageDataSrc: game.image_local !== null ? contextData.cdnUrl + game.image_local : game.image_url,
      }));

      const categoryGames = {
        category: category,
        games: gamesWithImages,
      };

      setFirstFiveCategoriesGames((prev) => {
        const updated = [...prev];
        updated[categoryIndex] = categoryGames;
        return updated;
      });

      pendingCategoryFetchesRef.current = Math.max(0, pendingCategoryFetchesRef.current - 1);
      if (pendingCategoryFetchesRef.current === 0) {
        setShowFullDivLoading(false);
      }
    }
  };

  const loadMoreContent = (category, categoryIndex) => {
    if (!category) return;
    if (isMobile) {
      setMobileShowMore(true);
    }
    setIsSingleCategoryView(true);
    setSelectedCategoryIndex(categoryIndex);
    setActiveCategory(category);
    fetchContent(category, category.id, category.table_name, categoryIndex, true);
    lastLoadedTagRef.current = category.code || "";
    window.scrollTo(0, 0);
  };

  const loadMoreGames = () => {
    if (!activeCategory) return;
    setIsLoadingGames(true);
    fetchContent(activeCategory, activeCategory.id, activeCategory.table_name, selectedCategoryIndex, false);
  };

  const fetchContent = (category, categoryId, tableName, categoryIndex, resetCurrentPage, pageGroupCode) => {
    let pageSize = 30;
    setIsLoadingGames(true);

    if (resetCurrentPage) {
      pageCurrent = 0;
      setGames([]);
    }

    setActiveCategory(category);
    setSelectedCategoryIndex(categoryIndex);

    const groupCode = categoryType === "categories" ? pageGroupCode || pageData.page_group_code : "default_pages_home"

    let apiUrl =
      "/get-content?page_group_type=categories&page_group_code=" +
      groupCode +
      "&table_name=" +
      tableName +
      "&apigames_category_id=" +
      categoryId +
      "&page=" +
      pageCurrent +
      "&length=" +
      pageSize;

    if (selectedProvider && selectedProvider.id) {
      apiUrl += "&provider=" + selectedProvider.id;
    }

    callApi(contextData, "GET", apiUrl, callbackFetchContent, null);
  };

  const callbackFetchContent = (result) => {
    if (result.status === 500 || result.status === 422) {
      setShowFullDivLoading(false);
      setIsLoadingGames(false);
    } else {
      if (pageCurrent == 0) {
        configureImageSrc(result);
        setGames(result.content);
      } else {
        configureImageSrc(result);
        setGames([...games, ...result.content]);
      }
      pageCurrent += 1;
    }
    setShowFullDivLoading(false);
    setIsLoadingGames(false);
  };

  const configureImageSrc = (result) => {
    (result.content || []).forEach((element) => {
      element.imageDataSrc = element.image_local !== null ? contextData.cdnUrl + element.image_local : element.image_url;
    });
  };

  const launchGame = (game, type, launcher) => {
    // Only show modal when explicitly using modal launcher
    if (launcher === "modal") {
      setShouldShowGameModal(true);
    } else {
      setShouldShowGameModal(false);
    }
    setShowFullDivLoading(true);
    selectedGameId = game?.id != null ? game.id : selectedGameId;
    selectedGameType = type != null ? type : selectedGameType;
    selectedGameLauncher = launcher != null ? launcher : selectedGameLauncher;
    selectedGameName = game?.name || selectedGameName;
    selectedGameImg = game?.image_local != null ? contextData.cdnUrl + game.image_local : selectedGameImg;
    callApi(contextData, "GET", "/get-game-url?game_id=" + selectedGameId, callbackLaunchGame, null);
  };

  const callbackLaunchGame = (result) => {
    setShowFullDivLoading(false);
    if (result.status == "0") {
      if (isMobile) {
        try {
          window.location.href = result.url;
        } catch (err) {
          try { window.open(result.url, "_blank", "noopener,noreferrer"); } catch (err) { }
        }
        selectedGameId = null;
        selectedGameType = null;
        selectedGameLauncher = null;
        selectedGameName = null;
        selectedGameImg = null;
        setGameUrl("");
        setShouldShowGameModal(false);
        return;
      }

      if (selectedGameLauncher === "tab") {
        try {
          window.open(result.url, "_blank", "noopener,noreferrer");
        } catch (err) {
          window.location.href = result.url;
        }
        selectedGameId = null;
        selectedGameType = null;
        selectedGameLauncher = null;
        selectedGameName = null;
        selectedGameImg = null;
        setGameUrl("");
        setShouldShowGameModal(false);
      } else {
        setGameUrl(result.url);
        setShouldShowGameModal(true);
      }
    }
  };

  const closeGameModal = () => {
    selectedGameId = null;
    selectedGameType = null;
    selectedGameLauncher = null;
    selectedGameName = null;
    selectedGameImg = null;
    setGameUrl("");
    setShouldShowGameModal(false);

    try {
      const el = document.getElementsByClassName("game-view-container")[0];
      if (el) {
        el.classList.add("d-none");
        el.classList.remove("fullscreen");
        el.classList.remove("with-background");
      }
      const iframeWrapper = document.getElementById("game-window-iframe");
      if (iframeWrapper) iframeWrapper.classList.add("d-none");
    } catch (err) {
      // ignore DOM errors
    }
    try { getPage('casino'); } catch (e) { }
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSelectedProvider(null);
    setTxtSearch("");
    setIsLoadingGames(true);
  };

  const handleProviderSelect = (provider, index = 0) => {
    setSelectedProvider(provider);
    setTxtSearch("");

    if (provider) {
      setActiveCategory(null);
      setSelectedCategoryIndex(-1);

      fetchContent(
        provider,
        provider.id,
        provider.table_name,
        index,
        true
      );

      if (isMobile) {
        setMobileShowMore(true);
      }
    } else {
      const firstCategory = categories[0];
      if (firstCategory) {
        setActiveCategory(firstCategory);
        setSelectedCategoryIndex(0);
        fetchContent(firstCategory, firstCategory.id, firstCategory.table_name, 0, true);
      }
    }
  };

  const search = (e) => {
    const keyword = typeof e === 'string' ? e : (e?.target?.value ?? '');
    setTxtSearch(keyword);

    if (typeof e === 'string') {
      performSearch(keyword);
      return;
    }

    if (e.key === "Enter" || e.keyCode === 13) {
      performSearch(keyword);
      searchRef.current?.blur();
    }

    if (e.key === "Escape" || e.keyCode === 27) {
      searchRef.current?.blur();
    }
  };

  const performSearch = (keyword) => {
    if (keyword.trim() === "") {
      setIsSingleCategoryView(false);
      setGames([]);
      getPage("casino");
      return;
    }

    setTxtSearch(keyword.trim());
    setGames([]);
    setIsSingleCategoryView(true);
    setActiveCategory({ name: `Búsqueda: "${keyword.trim()}"` });
    setSelectedProvider(null);
    setShowFullDivLoading(true);
    setIsLoadingGames(true);

    let pageSize = 30;

    callApi(
      contextData,
      "GET",
      "/search-content?keyword=" + encodeURIComponent(keyword.trim()) +
      "&page_group_code=" + pageData.page_group_code +
      "&length=" + pageSize,
      callbackSearch,
      null
    );
  };

  const callbackSearch = (result) => {
    setShowFullDivLoading(false);
    setIsLoadingGames(false);

    if (result.status === 500 || result.status === 422) {
      setGames([]);
    } else {
      configureImageSrc(result);
      setGames(result.content || []);
      pageCurrent = 1;
    }

    setIsSingleCategoryView(true);
    setActiveCategory({ name: `Búsqueda: "${txtSearch}"` });
    setSelectedProvider(null);
  };

  return (
    <>
      {shouldShowGameModal && selectedGameId !== null ? (
        <GameModal
          gameUrl={gameUrl}
          gameName={selectedGameName}
          gameImg={selectedGameImg}
          reload={launchGame}
          launchInNewTab={() => launchGame(null, null, "tab")}
          ref={refGameModal}
          onClose={closeGameModal}
          isMobile={isMobile}
        />
      ) : (
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
          <CasinoSlideshow />
          <main className="flex flex-col px-2 md:px-4 py-2">
            <ProviderContainer
              isMobile={isMobile}
              categories={categories}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              onProviderSelect={handleProviderSelect}
            />
            <div className="flex flex-col md:flex-row xl:w-full flex-grow xl:items-center gap-2">
              <CategoryContainer
                categories={tags}
                selectedCategoryIndex={selectedCategoryIndex}
                selectedProvider={selectedProvider}
                onCategoryClick={(tag, _id, _table, index) => {
                  setTxtSearch("");
                  if (window.location.hash !== `#${tag.code}`) {
                    window.location.hash = `#${tag.code}`;
                  } else {
                    setSelectedCategoryIndex(index);
                    getPage(tag.code);
                  }
                }}
                onCategorySelect={handleCategorySelect}
                isMobile={isMobile}
                pageType="casino"
              />

              <SearchInput
                txtSearch={txtSearch}
                setTxtSearch={setTxtSearch}
                searchRef={searchRef}
                search={search}
                isMobile={isMobile}
              />
            </div>

            <div className="casino container-full">
              {
                (txtSearch !== "" || selectedProvider) ? (
                  <>
                    <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6 xl:grid-cols-8 py-2">
                      {games.map((game, idx) => (
                        <GameCard
                          key={`list-${activeCategory?.id || 'search'}-${game.id}-${idx}`}
                          id={game.id}
                          provider={activeCategory?.name || "Casino"}
                          title={game.name}
                          imageSrc={
                            game.image_local !== null
                              ? contextData.cdnUrl + game.image_local
                              : game.image_url
                          }
                          game={game}
                          mobileShowMore={mobileShowMore}
                          onGameClick={(g) => {
                            if (isLogin) {
                              launchGame(g, "slot", "modal");
                            } else {
                              handleLoginClick();
                            }
                          }}
                        />
                      ))}
                    </div>

                    {isLoadingGames && <LoadApi />}

                    {!isLoadingGames && games.length === 0 && (
                      <div className="w-full px-4 py-2 text-center">
                        <span className="text-white">No se encontraron juegos para este proveedor</span>
                      </div>
                    )}

                    {games.length > 0 && (
                      <div className="flex justify-center my-5">
                        <button className="px-6 py-2 rounded-full shadow-xl bg-gradient-to-r from-blue-800 to-blue-500 text-white text-sm font-medium hover:opacity-90 transition-opacity" onClick={loadMoreGames}>
                          Ver más
                        </button>
                      </div>
                    )}
                  </>
                ) :
                  <>
                    {isSingleCategoryView ? (
                      <>
                        <div className="grid grid-cols-3 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6 xl:grid-cols-8 py-2">
                          {games.map((game, idx) => (
                            <GameCard
                              key={`cat-${selectedCategoryIndex}-${game.id}-${idx}`}
                              id={game.id}
                              title={game.name}
                              text={isLogin ? "Jugar" : "Ingresar"}
                              game={game}
                              imageSrc={game.image_local !== null ? contextData.cdnUrl + game.image_local : game.image_url}
                              mobileShowMore={mobileShowMore}
                              onGameClick={() => (isLogin ? launchGame(game, "slot", "modal") : handleLoginClick())}
                            />
                          ))}
                        </div>
                        {isLoadingGames && <LoadApi />}

                        {games.length > 0 && (
                          <div className="flex justify-center my-5">
                            <button className="px-6 py-2 rounded-full shadow-xl bg-gradient-to-r from-blue-800 to-blue-500 text-white text-sm font-medium hover:opacity-90 transition-opacity" onClick={loadMoreGames}>
                              Ver más
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {(
                          firstFiveCategoriesGames.map((entry, catIndex) => {
                            if (!entry || !entry.games) return null;

                            return (
                              <GameSlideshow
                                key={entry?.category?.id || catIndex}
                                games={entry.games}
                                title={entry?.category?.name}
                                slideshowKey={entry?.category?.id}
                                loadMoreContent={() => loadMoreContent(entry.category, catIndex)}
                                onGameClick={(g) => {
                                  if (isLogin) {
                                    launchGame(g, "slot", "modal");
                                  } else {
                                    handleLoginClick();
                                  }
                                }}
                              />
                            );
                          })
                        )}
                      </>
                    )}
                  </>
              }
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Casino;