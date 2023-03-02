import Layout from "@/components/Layout";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import placeholder from "../../assets/placeholder.png";

const ID = ({ data }) => {
    console.log(data);

    const router = useRouter();
    const defaultQuery = {
        searchQuery: "",
        diet: "",
        cuisineType: "",
        mealType: "",
        dishType: "",
    };
    const handleClick = (e) => {
        let newQuery = {
            ...defaultQuery,
        };
        if (e.target.innerHTML === "lunch/dinner") {
            newQuery[e.target.id] = "lunch";
            router.push({
                pathname: "/recipes",
                query: newQuery,
            });
            return;
            // Fuck you API
        }
        newQuery[e.target.id] = e.target.innerHTML.toLowerCase();
        router.push({
            pathname: "/recipes",
            query: newQuery,
        });
    };
    return (
        <>
            <Head>
                <title>Nam-Nam | {data.recipe.label}</title>
                <meta
                    name="description"
                    content="Food Database with Edamam API"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className="Wrapper text-light flex flex-col border-b-2 pb-6 border-dark-green min-h-screen bg-dark pt-24 max-w-lg mx-auto lg:max-w-5xl xl:max-w-none">
                    <div className="ImageWrapper relative md:w-1/3 xl:max-w-5xl h-96 max-h-4xl mx-6 xl:mx-auto mt-6">
                        <Image
                            className="object-cover"
                            src={data.recipe.image}
                            fill
                            priority
                            alt={data.recipe.label}
                        />
                    </div>
                    <div className="RecipeInfo md:mx-6 mt-3 w-full grid grid-cols-1 gap-6 lg:max-w-5xl lg:mx-auto lg:grid-cols-3 xl:pt-2 lg">
                        <div className="basicInfo px-6">
                            <h1 className="RecipeLabel pb-4 text-center text-2xl">
                                {data.recipe.label}
                            </h1>
                            <p className="dishType pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Dish Type:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    {data.recipe.dishType == undefined ? (
                                        <span className="capitalize font-normal bg-bittersweet ml-1 px-2 py-1 text-dark">
                                            -
                                        </span>
                                    ) : (
                                        data.recipe.dishType.map((element) => (
                                            <span
                                                key={element}
                                                onClick={(e) => handleClick(e)}
                                                id="dishType"
                                                className="capitalize font-normal bg-light-green ml-1 px-2 py-1 text-dark"
                                            >
                                                {element}
                                            </span>
                                        ))
                                    )}
                                </div>
                            </p>
                            <p className="mealType pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Meal Type:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    {data.recipe.mealType == undefined ? (
                                        <span className="capitalize font-normal bg-bittersweet ml-1 px-2 py-1 text-dark">
                                            -
                                        </span>
                                    ) : (
                                        data.recipe.mealType.map((element) => (
                                            <span
                                                id="mealType"
                                                key={element}
                                                onClick={(e) => handleClick(e)}
                                                className="capitalize font-normal bg-light-green ml-1 px-2 py-1 text-dark"
                                            >
                                                {element}
                                            </span>
                                        ))
                                    )}
                                </div>
                            </p>
                            <p className="cuisineType pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Cuisine Type:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    {data.recipe.cuisineType == undefined ? (
                                        <span className="capitalize font-normal bg-bittersweet ml-1 px-2 py-1 text-dark">
                                            -
                                        </span>
                                    ) : (
                                        data.recipe.cuisineType.map(
                                            (element) => (
                                                <span
                                                    id="cuisineType"
                                                    key={element}
                                                    onClick={(e) =>
                                                        handleClick(e)
                                                    }
                                                    className="capitalize font-normal bg-light-green ml-1 px-2 py-1 text-dark"
                                                >
                                                    {element}
                                                </span>
                                            )
                                        )
                                    )}
                                </div>
                            </p>
                            <p className="dietLabels pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Diet Labels:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    {data.recipe.dietLabels.length === 0 ? (
                                        <span className="capitalize font-normal bg-bittersweet ml-1 px-2 py-1 text-dark">
                                            -
                                        </span>
                                    ) : (
                                        data.recipe.dietLabels.map(
                                            (element) => (
                                                <span
                                                    id="diet"
                                                    key={element}
                                                    onClick={(e) =>
                                                        handleClick(e)
                                                    }
                                                    className="capitalize font-normal bg-light-green ml-1 px-2 py-1 text-dark"
                                                >
                                                    {element}
                                                </span>
                                            )
                                        )
                                    )}
                                </div>
                            </p>
                            <p className="calories pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Calories:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    <span>
                                        {Math.floor(data.recipe.calories)}
                                    </span>
                                </div>
                            </p>
                            <p className="cautions pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Cautions:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    {data.recipe.cautions.length === 0 ? (
                                        <span className="ml-1">-</span>
                                    ) : (
                                        data.recipe.cautions.map((element) => (
                                            <span
                                                key={element}
                                                className="ml-1"
                                            >
                                                {element}
                                            </span>
                                        ))
                                    )}
                                </div>
                            </p>
                            <p className="totalTime pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Time to Prepare:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    <span className="ml-1">
                                        {data.recipe.totalTime} min
                                    </span>
                                </div>
                            </p>
                            <p className="totalWeight pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Weight:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    <span className="ml-1">
                                        {Math.floor(data.recipe.totalWeight)} g
                                    </span>
                                </div>
                            </p>
                            <p className="yield pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                                <span>Yield:</span>{" "}
                                <div className="Labels overflow-hidden">
                                    <span className="ml-1">
                                        {data.recipe.yield}
                                    </span>
                                </div>
                            </p>
                        </div>
                        <div className="Nutrients px-6">
                            <h3 className="text-center text-2xl pt-3 xl:pt-0 pb-4">
                                Total Nutrients:
                            </h3>
                            {Object.keys(data.recipe.totalNutrients).map(
                                (element) => (
                                    <div
                                        key={
                                            data.recipe.totalNutrients[element]
                                                .label
                                        }
                                        className="flex justify-between border-b border-dotted border-dark-green py-1"
                                    >
                                        <span>
                                            {
                                                data.recipe.totalNutrients[
                                                    element
                                                ].label
                                            }
                                            :
                                        </span>
                                        <div>
                                            <span>
                                                {Math.round(
                                                    data.recipe.totalNutrients[
                                                        element
                                                    ].quantity * 100
                                                ) /
                                                    100 +
                                                    " "}
                                            </span>

                                            <span>
                                                {
                                                    data.recipe.totalNutrients[
                                                        element
                                                    ].unit
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="Ingredients">
                            <h3 className="text-center text-2xl py-3 xl:pt-0 pb-4">
                                Ingredients:
                            </h3>
                            {data.recipe.ingredients.map((element) => (
                                <div
                                    key={element.food}
                                    className="odd:bg-dark-green p-6 flex flex-row justify-between"
                                >
                                    <div className="ImageWrapper relative h-36 w-1/2">
                                        <Image
                                            src={
                                                element.image
                                                    ? element.image
                                                    : placeholder
                                            }
                                            className="object-cover"
                                            fill
                                            alt={element.food}
                                        />
                                    </div>
                                    <div className="IngredientInfo pl-6 w-1/2 flex flex-col items-center justify-evenly">
                                        <h6 className="capitalize">
                                            {element.food}
                                        </h6>
                                        <p className="capitalize">
                                            {Math.round(
                                                element.quantity * 100
                                            ) / 100}{" "}
                                            {element.measure}
                                        </p>
                                        <p>
                                            Weight:{" "}
                                            {Math.round(element.weight * 100) /
                                                100}{" "}
                                            g
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Link
                        href={data.recipe.url}
                        className="GoToRecipe drop-shadow-2xl mx-auto max-w-sm z-50 top-28 w-full text-center mt-2 py-2 text-xl"
                    >
                        <p className="w-full text-center text-dark mt-2 py-2 text-xl bg-bittersweet">
                            Go To Instructions
                        </p>
                    </Link>
                </div>
            </Layout>
        </>
    );
};

export default ID;

export async function getServerSideProps(context) {
    if (context.query.id == undefined) {
        return {
            props: {
                error: true,
            },
        };
    }
    const fetchedData = await axios
        .get(
            `https://api.edamam.com/api/recipes/v2/${context.query.id}?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
        )
        .then((res) => res.data);
    // console.log("fetched data", fetchedData);
    return {
        props: {
            data: fetchedData,
        },
    };
}
