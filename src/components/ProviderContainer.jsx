import { useLocation } from "react-router-dom";

const ProviderContainer = ({
    categories,
    selectedProvider,
    onProviderSelect,
    isMobile
}) => {
    const location = useLocation();
    const providers = categories.filter(cat => cat.code !== "home" && cat.code);

    const handleClick = (e, provider) => {
        e.preventDefault();
        onProviderSelect(provider);
    };

    const handleSelectChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const provider = providers.find(p => p.id === selectedId);
        if (provider) onProviderSelect(provider);
    };

    const isSelected = (provider) => {
        const hashCode = location.hash.substring(1);
        return (selectedProvider && selectedProvider.id === provider.id) ||
            (hashCode === provider.code);
    };

    return (
        <>
            {isMobile ? (
                <nav className="providers-nav providers-nav-dropdown loaded filled-buttons">
                    <div className="container-full-inner">
                        <div className="row">
                            <div className="column">
                                <div className="select-container">
                                    <label>
                                        <select
                                            value={selectedProvider?.id || ""}
                                            onChange={handleSelectChange}
                                        >
                                            <option value="">Proveedores</option>
                                            {providers.map((provider) => (
                                                <option key={provider.id} value={provider.id}>
                                                    {provider.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            ) : (
                <nav className="providers-nav providers-nav-text filled-buttons loaded">
                    <div className="nav-link-wrapper-parent">
                        {providers.map((provider) => {
                            const selected = isSelected(provider);
                            return (
                                <a
                                    key={provider.id}
                                    href="#"
                                    className={`nav-link-wrapper${selected ? " active" : ""}`}
                                    onClick={(e) => handleClick(e, provider)}
                                >
                                    <span className="text">{provider.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </nav>
            )}
        </>
    );
};

export default ProviderContainer;