import React from "react";

const filters = [
    {
        label: "Diet",
        name: "diet",
        options: [
            "balanced",
            "high-fiber",
            "high-protein",
            "low-carb",
            "low-fat",
            "low-sodium",
        ],
    },
    {
        label: "Cuisine Type",
        name: "cuisineType",
        options: [
            "American",
            "Asian",
            "British",
            "Caribbean",
            "Central Europe",
            "Chinese",
            "Eastern Europe",
            "French",
            "Indian",
            "Italian",
            "Japanese",
            "Kosher",
            "Mediterranean",
            "Mexican",
            "Middle Eastern",
            "Nordic",
            "South American",
            "South East Asian",
        ],
    },
    {
        label: "Meal Type",
        name: "mealType",
        options: ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"],
    },
    {
        label: "Dish Type",
        name: "dishType",
        options: [
            "Biscuits and Cookies",
            "Bread",
            "Cereals",
            "Condiments and Sauces",
            "Desserts",
            "Drinks",
            "Main Course",
            "Pancake",
            "Preps",
            "Preserve",
            "Salad",
            "Sandwiches",
            "Side dish",
            "Soup",
            "Starter",
            "Sweets",
        ],
    },
];

const SearchInput = ({
    handleSearch,
    queryFilters,
    changeHandler,
    error,
    setError,
}) => {
    const tailwindError = error ? "border-b-2 border-bittersweet" : "";
    const inputPlaceholderValue = error ? "Please input or filter" : "Search";
    const buttonColor = error ? "bg-bittersweet" : "bg-dark-green";
    return (
        <>
            <div className="InputSearch pb-3 w-full flex justify-between">
                <input
                    className={`w-full py-2 px-4 border-b-2 border-transparent transition focus:border-b-light-green ${tailwindError}`}
                    type="text"
                    placeholder={inputPlaceholderValue}
                    id="search"
                    value={queryFilters.searchQuery}
                    onChange={(e) => changeHandler(e)}
                    onClick={() => setError(false)}
                />
                <button
                    onClick={handleSearch}
                    className={`${buttonColor} p-2`}
                    type="submit"
                >
                    LUPA
                </button>
            </div>
            <div className="Filters">
                <div className="SelectGridBox grid grid-cols-2 gap-3">
                    {filters.map((element) => (
                        <div
                            key={element.name}
                            className="selectBox flex flex-col"
                        >
                            <label
                                className="pb-1 opacity-80 text-sm text-light"
                                htmlFor={element.name}
                            >
                                {element.label}:
                            </label>
                            <select
                                className="px-3 py-2"
                                name={element.name}
                                id={element.name}
                                onChange={(e) => changeHandler(e)}
                                value={queryFilters[element.name]}
                            >
                                <option value="">None</option>
                                {element.options.map((option) => (
                                    <option
                                        key={option}
                                        className="capitalize"
                                        value={option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchInput;
