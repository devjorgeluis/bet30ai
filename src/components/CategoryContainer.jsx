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
        <div className="flex-grow min-w-0">
            <div className="py-1 w-full md:w-auto md:flex-1">
                <div className="flex gap-2 pt-1 sm:gap-4 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-thin md:scrollbar-track-purple-900/10 md:scrollbar-thumb-purple-600/50 hover:scrollbar-thumb-purple-600/70">
                    {props.categories.map((category, index) => (
                        <CategoryButton
                            key={category.id ?? category.code ?? index}
                            name={category.name}
                            code={category.code}
                            image={category.image}
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
    )
}

export default CategoryContainer