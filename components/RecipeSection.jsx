import Image from "next/image";
import React from "react";

import RecipeSectionCard from "./RecipeSectionCard";

const arr = [
    {
        name: "Pizza",
    },
    {
        name: "Pasta",
    },
    {
        name: "Kebab",
    },
    {
        name: "Sushi",
    },
];

const RecipeSection = () => {
    return (
        <div className="h-screen snap-start border-b-2 border-dark-green bg-dark pt-24 flex flex-col justify-evenly px-6 sm:px-12 md:px-16 lg:px-24">
            <div className="Text">
                <div className="SectionTitle text-2xl font-light text-center sm:text-3xl md:text-4xl lg:text-5xl">
                    Cooking Made Easy: Your Go-To Source for Mouth-Watering
                    Recipes
                </div>
                <div className="SectionDescription font-light text-center text-lg opacity-50 w-2/3 pt-5 mx-auto sm:text-xl md:text-2xl lg:text-3xl">
                    Explore Thousands of Recipes for Every Meal and Occasion
                </div>
            </div>
            <div className="RecipeCardWrapper grid grid-cols-2 gap-6 md:grid-cols-4">
                {arr.map((element) => (
                    <RecipeSectionCard key={element.name} data={element} />
                ))}
            </div>
        </div>
    );
};

export default RecipeSection;
// sushi
// kebab
// pasta
// pizza
