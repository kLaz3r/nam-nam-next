import Image from "next/image";
import Link from "next/link";
import React from "react";

type RecipeSectionCardProps = {
  data: {
    name: string;
  };
};
const RecipeSectionCard = ({ data }: RecipeSectionCardProps) => {
  const getImage = (name: string): string => {
    switch (name) {
      case "Sushi":
        return "/assets/sushi.jpg";
      case "Kebab":
        return "/assets/kebab.webp";
      case "Pizza":
        return "/assets/pizza.jpg";
      case "Pasta":
        return "/assets/pasta.jpg";
      default:
        return "/";
    }
  };
  const getHref = (name: string): string => {
    switch (name) {
      case "Sushi":
        return "/recipes?searchQuery=sushi&diet=&cuisineType=&mealType=&dishType=&_cont=";
      case "Kebab":
        return "/recipes?searchQuery=kebab&diet=&cuisineType=&mealType=&dishType=&_cont=";
      case "Pizza":
        return "/recipes?searchQuery=pizza&diet=&cuisineType=&mealType=&dishType=&_cont=";
      case "Pasta":
        return "/recipes?searchQuery=pasta&diet=&cuisineType=&mealType=&dishType=&_cont=";
      default:
        return "/";
    }
  };
  return (
    <Link
      href={getHref(data.name)}
      className=" flex h-48 flex-col justify-evenly bg-dark-green transition-all hover:bg-bittersweet active:bg-bittersweet md:h-56 lg:h-72 xl:h-96"
    >
      <div className=" ImageWrapper relative h-4/5">
        <Image
          src={getImage(data.name)}
          className="object-cover"
          fill
          priority
          alt={data.name}
        />
      </div>
      <div className="RecipeInfo flex h-1/5 items-center justify-center  text-center  text-xl font-light xl:text-3xl">
        <p>{data.name}</p>
      </div>
    </Link>
  );
};

export default RecipeSectionCard;
