const CategoryButton = (props) => {
    let customClass = "bg-provider-color sm:h-[50px] flex justify-center items-center w-auto h-full flex-shrink-0 relative rounded-full overflow-hidden transition-all duration-300 snap-start group border-wallet-button";
    if (props.active == true) {
        customClass += " bg-button";
    }

    return (
        <button className={customClass} onClick={props.onClick}>
            <div className="w-full h-auto relative flex items-center justify-center px-3 py-2 md:p-2 text-nowrap scrollbar-none gap-2">
                <img src={props.image} className="text-white" width={24} height={24} />
                <span className="text-sm text-white">{props.name}</span>
            </div>
        </button>
    );
};

export default CategoryButton;
