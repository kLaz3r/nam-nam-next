import Image from "next/image";
import React from "react";

type Filter = {
  label: string;
  options: string[];
};

type Filters = {
  [key: string]: Filter;
};

const filters: Filters = {
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

type QueryFilters = {
  [key: string]: string;
};

type SearchInputProps = {
  handleSearch: () => void;
  queryFilters: QueryFilters;
  changeHandler: (e: React.ChangeEvent) => void;
  error: boolean;
  setError: (error: boolean) => void;
};

const SearchInput = ({
  handleSearch,
  queryFilters,
  changeHandler,
  error,
  setError,
}: SearchInputProps) => {
  // Object.keys(filters).map((keyName) => {
  //     console.log(queryFilters[keyName]);
  // });
  const tailwindError = error
    ? "border-b-2 border-bittersweet"
    : "border-b-2 border-transparent";
  const inputPlaceholderValue = error ? "Please input or filter" : "Search";
  const buttonColor = error ? "bg-bittersweet" : "bg-dark-green";
  return (
    <div className="mx-auto max-w-xl">
      <div className="InputSearch flex w-full justify-between pb-3">
        <input
          className={`w-full py-2 px-4 transition focus:border-b-light-green ${tailwindError}`}
          type="text"
          placeholder={inputPlaceholderValue}
          id="search"
          value={queryFilters.searchQuery}
          onChange={(e) => changeHandler(e)}
          onClick={() => setError(false)}
        />
        <button
          onClick={handleSearch}
          className={`${buttonColor} relative h-12 w-12 p-2 transition hover:bg-bittersweet`}
          type="submit"
        >
          <Image
            className="searchIconWhite my-auto h-12 max-h-6 w-12"
            alt="Search Button"
            src="/assets/search-icon.svg"
            fill
          />
        </button>
      </div>
      <div className="Filters">
        <div className="SelectGridBox grid grid-cols-2 gap-3">
          {Object.keys(filters).map((keyName) => (
            <div
              key={filters[keyName]?.label}
              className="selectBox flex flex-col"
            >
              <label
                className="pb-1 text-sm text-light opacity-80"
                htmlFor={filters[keyName]?.label}
              >
                {filters[keyName]?.label}:
              </label>
              <select
                className="px-3 py-2"
                name={filters[keyName]?.label}
                id={filters[keyName]?.label}
                onChange={(e) => changeHandler(e)}
                value={queryFilters[keyName]}
              >
                <option value="">None</option>
                {filters[keyName]?.options.map((option) => (
                  <option key={option} className="capitalize" value={option}>
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
