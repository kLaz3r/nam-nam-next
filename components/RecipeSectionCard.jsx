import Image from "next/image";
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
    return (
        <div className=" flex flex-col h-48 justify-evenly">
            <div className=" relative ImageWrapper h-4/5">
                <Image
                    src={getImage(data.name)}
                    className="object-cover"
                    fill
                />
            </div>
            <div className="RecipeInfo h-1/5 text-center text-xl font-light bg-dark-green flex justify-center items-center">
                <p>{data.name}</p>
            </div>
        </div>
    );
};

export default RecipeSectionCard;
