import Image from "next/image";
import Link from "next/link";
import React from "react";
import kebab from "../assets/kebab.webp";
import pasta from "../assets/pasta.jpg";
import pizza from "../assets/pizza.jpg";
import sushi from "../assets/sushi.jpg";

const RecipeSectionCard = ({ data }) => {
    const getImage = (name) => {
        switch (name) {
            case "Sushi":
                return sushi;
            case "Kebab":
                return kebab;
            case "Pizza":
                return pizza;
            case "Pasta":
                return pasta;
        }
    };
    const getHref = (name) => {
        switch (name) {
            case "Sushi":
                return "/recipes?searchQuery=sushi&diet=&cuisineType=&mealType=&dishType=";
            case "Kebab":
                return "/recipes?searchQuery=kebab&diet=&cuisineType=&mealType=&dishType=";
            case "Pizza":
                return "/recipes?searchQuery=pizza&diet=&cuisineType=&mealType=&dishType=";
            case "Pasta":
                return "/recipes?searchQuery=pasta&diet=&cuisineType=&mealType=&dishType=";
        }
    };
    return (
        <Link
            href={getHref(data.name)}
            className=" flex flex-col h-48 justify-evenly"
        >
            <div className=" relative ImageWrapper h-4/5">
                <Image
                    src={getImage(data.name)}
                    className="object-cover"
                    fill
                    priority
                    alt={data.name}
                />
            </div>
            <div className="RecipeInfo h-1/5 text-center text-xl font-light bg-dark-green flex justify-center items-center">
                <p>{data.name}</p>
            </div>
        </Link>
    );
};

export default RecipeSectionCard;
