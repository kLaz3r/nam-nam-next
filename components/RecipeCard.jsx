import Image from "next/image";
import Link from "next/link";
import React from "react";
import pizza from "../assets/pizza.jpg";

const RecipeCard = ({ data }) => {
    console.log(data.recipe);
    const selfLink = data._links.self.href;
    return (
        <Link href="/recipe" className="Wrapper h-72">
            <div className="relative ImageWrapper h-5/6 border-b-2 border-light-green">
                <Image src={pizza} fill className="object-cover"></Image>
            </div>
            <div className="RecipeName text-center font-light text-sm bg-dark-green h-1/6 flex justify-center items-center">
                <p>{data.recipe.label}</p>
            </div>
        </Link>
    );
};

export default RecipeCard;
