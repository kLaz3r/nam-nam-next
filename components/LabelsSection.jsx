import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import bgLabels from "../assets/labels-bg.jpg";

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

    const labelClickHandler = (e) => {
        console.log(e.target.id);
        console.log(e.target.innerHTML.toLowerCase());
        let routerQuery = {};
        switch (e.target.id) {
            case "dishType":
                routerQuery = {
                    ...defaultQuery,
                    dishType: e.target.innerHTML.toLowerCase(),
                };
                break;
            case "diet":
                routerQuery = {
                    ...defaultQuery,
                    diet: e.target.innerHTML.toLowerCase(),
                };
                break;
            case "mealType":
                routerQuery = {
                    ...defaultQuery,
                    mealType: e.target.innerHTML.toLowerCase(),
                };
                break;
            case "cuisineType":
                routerQuery = {
                    ...defaultQuery,
                    cuisineType: e.target.innerHTML.toLowerCase(),
                };
                break;
        }
        router.push({
            pathname: "/recipes",
            query: routerQuery,
        });
    };
    return (
        <>
            <Image
                src={bgLabels}
                className="absolute w-full h-full object-cover -z-10 opacity-50"
                priority
                alt="Hero Image"
            />
            <div className="h-screen flex flex-col justify-evenly bg-gradient-to-tr from-transparent to-dark">
                <div className="Text pt-24 flex flex-col justify-center items-end">
                    <h1 className="Title text-right text-3xl mx-6 text-light">
                        Customize Your Diet: Filter Recipes by Your Preferred
                        Labels
                    </h1>
                    <h2 className="Description text-right text-xl mx-6 text-light font-light mt-6 w-2/3 opacity-70">
                        Discover Delicious Recipes Tailored to Your Dietary
                        Needs and Preferences
                    </h2>
                </div>
                <div className="Labels grid grid-cols-2 mx-auto">
                    {Labels.map((element) => (
                        <div
                            key={element.name}
                            id={element.type}
                            onClick={(e) => labelClickHandler(e)}
                            className="Label px-6 py-1 my-3 mx-3 bg-dark-green text-center transition-all active:bg-bittersweet"
                        >
                            {element.label}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default LabelsSection;
