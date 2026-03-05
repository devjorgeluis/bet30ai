import { useContext } from "react";
import { LayoutContext } from "./Layout/LayoutContext";

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
        <>
            <div className="column search-nav-column">
                <div className="search-box" id="search-form">
                    <input
                        ref={searchRef}
                        className="search-input"
                        placeholder="Buscar ..."
                        value={txtSearch}
                        onChange={handleChange}
                        onKeyUp={search}
                        onFocus={handleFocus}
                    />
                    <button onClick={() => { if (typeof onSearchClick === 'function') onSearchClick(txtSearch); else if (typeof search === 'function') search(txtSearch); }}>
                        Buscar
                    </button>
                </div>
            </div>
        </>
    );
};

export default SearchInput;
