import { useContext } from "react";
import { LayoutContext } from "./Layout/LayoutContext";
import IconSearch from "/src/assets/svg/search.svg";

const SearchInput = ({
    txtSearch,
    setTxtSearch,
    searchRef,
    search,
    isMobile,
    onSearchClick
}) => {
    const { setShowMobileSearch } = useContext(LayoutContext);

    const handleChange = (event) => {
        const value = event.target.value;
        setTxtSearch(value);
        if (typeof search === 'function') search(value);
    };

    const handleFocus = () => {
        if (isMobile) {
            setShowMobileSearch(true);
        }
    };

    return (
        <div className="flex-shrink-0">
            <div className="flex py-1 md:py-2 w-full xl:ml-4">
                <div className="flex w-full gap-x-1">
                    <div className="flex rounded-full bg-provider-color w-3/4 xl:w-full items-center py-2 md:py-3 overflow-hidden border border-borderColor">
                        <img src={IconSearch} className="ml-2 text-white" />
                        <input
                            ref={searchRef}
                            className="pl-2 flex items-center justify-center bg-transparent outline-none w-full text-sm font-bold text-white"
                            placeholder="Buscar ..."
                            value={txtSearch}
                            onChange={handleChange}
                            onKeyUp={search}
                            onFocus={handleFocus}
                        />
                    </div>
                    <button 
                        onClick={() => { if (typeof onSearchClick === 'function') onSearchClick(txtSearch); else if (typeof search === 'function') search(txtSearch); }}
                        className="rounded-full px-4 py-2 w-1/4 xl:w-44 bg-button text-white text-sm font-medium whitespace-nowrap"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchInput;
