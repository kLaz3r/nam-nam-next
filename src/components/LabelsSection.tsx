import { useRouter } from "next/router";
import React from "react";

const Labels = [
  {
    label: "Caribbean",
    name: "caribbean",
    type: "cuisineType",
  },
  {
    label: "Balanced",
    name: "balanced",
    type: "diet",
  },
  {
    label: "High-protein",
    name: "high-protein",
    type: "diet",
  },
  {
    label: "Snack",
    name: "snack",
    type: "mealType",
  },
  {
    label: "Cereals",
    name: "cereals",
    type: "dishType",
  },
  {
    label: "Pancake",
    name: "pancake",
    type: "dishType",
  },
  {
    label: "Bread",
    name: "bread",
    type: "dishType",
  },
  {
    label: "Drinks",
    name: "drinks",
    type: "dishType",
  },
];

const LabelsSection = () => {
  const router = useRouter();
  const defaultQuery = {
    searchQuery: "",
    diet: "",
    cuisineType: "",
    mealType: "",
    dishType: "",
    _cont: "",
  };

  const labelClickHandler = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // console.log(e.currentTarget.id);
    // console.log(e.currentTarget.innerHTML.toLowerCase());
    let routerQuery = {};
    switch (e.currentTarget.id) {
      case "dishType":
        routerQuery = {
          ...defaultQuery,
          dishType: e.currentTarget.innerHTML.toLowerCase(),
        };
        break;
      case "diet":
        routerQuery = {
          ...defaultQuery,
          diet: e.currentTarget.innerHTML.toLowerCase(),
        };
        break;
      case "mealType":
        routerQuery = {
          ...defaultQuery,
          mealType: e.currentTarget.innerHTML.toLowerCase(),
        };
        break;
      case "cuisineType":
        routerQuery = {
          ...defaultQuery,
          cuisineType: e.currentTarget.innerHTML.toLowerCase(),
        };
        break;
    }
    await router.push({
      pathname: "/recipes",
      query: routerQuery,
    });
  };
  return (
    <div className="snap-start bg-labels bg-cover">
      <div className="flex h-screen flex-col items-end justify-evenly border-b-2 border-dark-green bg-gradient-to-tr from-transparent to-dark lg:flex-row-reverse lg:items-center lg:justify-between">
        <div className="Text flex flex-col items-end justify-end pt-24 md:w-2/3 lg:w-1/2 lg:pt-24 xl:mr-24">
          <h1 className="Title mx-6 text-right text-3xl text-light xl:text-5xl">
            Customize Your Diet: Filter Recipes by Your Preferred Labels
          </h1>
          <h2 className="Description mx-6 mt-6 w-2/3 text-right text-xl font-light text-light opacity-70 xl:text-3xl">
            Discover Delicious Recipes Tailored to Your Dietary Needs and
            Preferences
          </h2>
        </div>
        <div className="Labels  mx-auto grid grid-cols-2 gap-6 lg:pt-24 xl:ml-24">
          {Labels.map((element) => (
            <div
              key={element.name}
              id={element.type}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={(e) => labelClickHandler(e)}
              className="Label cursor-pointer bg-dark-green px-6 py-1 text-center transition-all hover:bg-bittersweet active:bg-bittersweet md:text-2xl xl:px-9 xl:py-3 xl:text-4xl"
            >
              {element.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabelsSection;
