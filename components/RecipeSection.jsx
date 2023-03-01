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
        <div className="h-screen bg-dark pt-24 flex flex-col justify-evenly px-6">
            <div className="Text">
                <div className="SectionTitle text-2xl font-light text-center">
                    Cooking Made Easy: Your Go-To Source for Mouth-Watering
                    Recipes
                </div>
                <div className="SectionDescription font-light text-center text-lg opacity-50 w-2/3 pt-5 mx-auto">
                    Explore Thousands of Recipes for Every Meal and Occasion
                </div>
            </div>
            <div className="RecipeCardWrapper grid grid-cols-2 gap-6">
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
