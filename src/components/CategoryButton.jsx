const CategoryButton = (props) => {
    let customClass = "nav-link-wrapper";
    if (props.active == true) {
        customClass += " active";
    }

    return (
        <a className={customClass} onClick={props.onClick}>
            <span className={"icon " + props.icon} />
            <span className="text">{props.name}</span>
        </a>
    );
};

export default CategoryButton;
