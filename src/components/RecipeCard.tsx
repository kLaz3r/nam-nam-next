import Image from "next/image";
import Link from "next/link";
import React from "react";
import { type Hit } from "~/pages/recipes";

type RecipeCardProps = {
  data: Hit;
  index: number;
};

const RecipeCard = ({ data, index }: RecipeCardProps) => {
  const selfLink = data._links.self.href;
  const getLinkFromSelfLink = (selfLink: string) => {
    const id = selfLink.match(/\b[0-9a-f]{32}\b/);
    if (id === null) {
      return "/recipes";
    } else {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `/recipe/${id}`;
    }
  };
  getLinkFromSelfLink(selfLink);

  let label = "";
  if (data.recipe.label.length > 35) {
    label = data.recipe.label.slice(0, 35) + "...";
  } else {
    label = data.recipe.label;
  }
  return (
    <Link href={getLinkFromSelfLink(selfLink)} className="Wrapper group h-72">
      <div className="ImageWrapper relative h-5/6 border-b-2 border-light-green transition-all group-hover:border-bittersweet">
        <Image
          alt={data.recipe.label}
          src={data.recipe.image}
          fill
          priority={index < 3 ? true : false}
          className="object-cover"
        ></Image>
      </div>
      <div className="RecipeName font flex h-1/6 items-center justify-center overflow-clip bg-dark-green text-center text-sm transition-all group-hover:bg-bittersweet">
        <p className="px-3">{label}</p>
      </div>
    </Link>
  );
};

export default RecipeCard;
