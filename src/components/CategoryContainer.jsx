import CategoryButton from "./CategoryButton";

const CategoryContainer = (props) => {
    if (!props.categories || props.categories.length === 0) {
        return null;
    }

    const handleCategoryClick = (category, index) => {
        if (props.onCategoryClick) {
            props.onCategoryClick(category, category.id, category.table_name, index, true);
        }
        if (props.onCategorySelect) {
            props.onCategorySelect(category);
        }
    };

    return (
        <>
            {
                props.isMobile ? <>
                    <nav className="nav-link-wrapper-parent">
                        {props.categories.map((category, index) => (
                            <CategoryButton
                                key={category.id ?? category.code ?? index}
                                name={category.name}
                                code={category.code}
                                icon={category.icon}
                                count={category.element_count}
                                active={
                                    props.selectedProvider === null &&
                                    props.selectedCategoryIndex === index
                                }
                                onClick={() => handleCategoryClick(category, index)}
                            />
                        ))}
                    </nav>
                </> : 
                <div className="column column-75 casino-tags-column">
                    <div className="scrollable-window">
                        <div className="casino-tags">
                            <div className="nav-link-wrapper-parent">
                                {props.categories.map((category, index) => (
                                    <CategoryButton
                                        key={category.id ?? category.code ?? index}
                                        name={category.name}
                                        code={category.code}
                                        icon={category.icon}
                                        count={category.element_count}
                                        active={
                                            props.selectedProvider === null &&
                                            props.selectedCategoryIndex === index
                                        }
                                        onClick={() => handleCategoryClick(category, index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CategoryContainer