import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const RecipeCard = ({ data }) => {
    const router = useRouter();
    const selfLink = data._links.self.href;
    const getLinkFromSelfLink = (selfLink) => {
        let id = selfLink.match(/\b[0-9a-f]{32}\b/);
        return `/recipe/${id}`;
    };
    getLinkFromSelfLink(selfLink);

    let label = "";
    if (data.recipe.label.length > 35) {
        label = data.recipe.label.slice(0, 35) + "...";
    } else {
        label = data.recipe.label;
    }
    return (
        <Link href={getLinkFromSelfLink(selfLink)} className="Wrapper h-72">
            <div className="relative ImageWrapper h-5/6 border-b-2 border-light-green">
                <Image
                    alt={data.recipe.label}
                    src={data.recipe.image}
                    fill
                    className="object-cover"
                ></Image>
            </div>
            <div className="RecipeName overflow-clip text-center font-light text-sm bg-dark-green h-1/6 flex justify-center items-center">
                <p className="px-3">{label}</p>
            </div>
        </Link>
    );
};

export default RecipeCard;
