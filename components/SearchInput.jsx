import Image from "next/image";
import React from "react";
import searchIcon from "../assets/search-icon.svg";

const filters = {
    diet: {
        label: "Diet",
        options: [
            "balanced",
            "high-fiber",
            "high-protein",
            "low-carb",
            "low-fat",
            "low-sodium",
        ],
    },
    cuisineType: {
        label: "Cuisine Type",
        options: [
            "american",
            "asian",
            "british",
            "caribbean",
            "central europe",
            "chinese",
            "eastern europe",
            "french",
            "indian",
            "italian",
            "japanese",
            "kosher",
            "mediterranean",
            "mexican",
            "middle eastern",
            "nordic",
            "south american",
            "south east asian",
        ],
    },
    mealType: {
        label: "Meal Type",
        options: ["breakfast", "dinner", "lunch", "snack", "teatime"],
    },
    dishType: {
        label: "Dish Type",
        options: [
            "biscuits and cookies",
            "bread",
            "cereals",
            "condiments and sauces",
            "desserts",
            "drinks",
            "main course",
            "pancake",
            "preps",
            "preserve",
            "salad",
            "sandwiches",
            "side dish",
            "soup",
            "starter",
            "sweets",
        ],
    },
};

const SearchInput = ({
    handleSearch,
    queryFilters,
    changeHandler,
    error,
    setError,
}) => {
    // Object.keys(filters).map((keyName) => {
    //     console.log(queryFilters[keyName]);
    // });
    const tailwindError = error
        ? "border-b-2 border-bittersweet"
        : "border-b-2 border-transparent";
    const inputPlaceholderValue = error ? "Please input or filter" : "Search";
    const buttonColor = error ? "bg-bittersweet" : "bg-dark-green";
    return (
        <div className="max-w-xl mx-auto">
            <div className="InputSearch pb-3 w-full flex justify-between">
                <input
                    className={`w-full py-2 px-4  transition focus:border-b-light-green ${tailwindError}`}
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
                    <Image
                        className="max-h-6 object-contain w-16 searchIconWhite"
                        alt="Search Button"
                        src={searchIcon}
                    />
                </button>
            </div>
            <div className="Filters">
                <div className="SelectGridBox grid grid-cols-2 gap-3">
                    {Object.keys(filters).map((keyName) => (
                        <div
                            key={filters[keyName].label}
                            className="selectBox flex flex-col"
                        >
                            <label
                                className="pb-1 opacity-80 text-sm text-light"
                                htmlFor={filters[keyName].label}
                            >
                                {filters[keyName].label}:
                            </label>
                            <select
                                className="px-3 py-2"
                                name={filters[keyName].label}
                                id={filters[keyName].label}
                                onChange={(e) => changeHandler(e)}
                                value={queryFilters[keyName]}
                            >
                                <option value="">None</option>
                                {filters[keyName].options.map((option) => (
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
        </div>
    );
};

export default SearchInput;
