import Layout from "@/components/Layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import placeholder from "../../assets/placeholder.png";

const ID = ({ data }) => {
    // console.log(data);

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
        <Layout>
            <div className="Wrapper text-light flex flex-col min-h-screen bg-dark pt-24">
                <div className="ImageWrapper relative h-72 m-6">
                    <Image
                        className="object-cover"
                        src={data.recipe.image}
                        fill
                        priority
                    />
                </div>
                <div className="RecipeInfo mx-6">
                    <div className="basicInfo">
                        <h1 className="RecipeLabel pb-4 text-center text-2xl">
                            {data.recipe.label}
                        </h1>
                        <p className="dishType pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                            <span>Dish Type:</span>{" "}
                            <div className="Labels overflow-hidden">
                                {data.recipe.dishType.map((element) => (
                                    <span
                                        key={element}
                                        onClick={(e) => handleClick(e)}
                                        id="dishType"
                                        className="capitalize font-normal bg-light-green ml-1 px-2 py-1 text-dark"
                                    >
                                        {element}
                                    </span>
                                ))}
                            </div>
                        </p>
                        <p className="mealType pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                            <span>Meal Type:</span>{" "}
                            <div className="Labels overflow-hidden">
                                {data.recipe.mealType.map((element) => (
                                    <span
                                        id="mealType"
                                        key={element}
                                        onClick={(e) => handleClick(e)}
                                        className="capitalize font-normal bg-light-green ml-1 px-2 py-1 text-dark"
                                    >
                                        {element}
                                    </span>
                                ))}
                            </div>
                        </p>
                        <p className="cuisineType pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                            <span>Cuisine Type:</span>{" "}
                            <div className="Labels overflow-hidden">
                                {data.recipe.cuisineType.map((element) => (
                                    <span
                                        id="cuisineType"
                                        key={element}
                                        onClick={(e) => handleClick(e)}
                                        className="capitalize font-normal bg-light-green ml-1 px-2 py-1 text-dark"
                                    >
                                        {element}
                                    </span>
                                ))}
                            </div>
                        </p>
                        <p className="dietLabels pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                            <span>Diet Labels:</span>{" "}
                            <div className="Labels overflow-hidden">
                                {data.recipe.dietLabels.map((element) => (
                                    <span
                                        id="diet"
                                        key={element}
                                        onClick={(e) => handleClick(e)}
                                        className="capitalize font-normal bg-light-green ml-1 px-2 py-1 text-dark"
                                    >
                                        {element}
                                    </span>
                                ))}
                            </div>
                        </p>
                        <p className="calories pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                            <span>Calories:</span>{" "}
                            <div className="Labels overflow-hidden">
                                <span>{Math.floor(data.recipe.calories)}</span>
                            </div>
                        </p>
                        <p className="cautions pt-2 font-light flex flex-row items-center justify-between border-b border-dotted pb-2 border-dark-green">
                            <span>Cautions:</span>{" "}
                            <div className="Labels overflow-hidden">
                                {data.recipe.cautions.length === 0 ? (
                                    <span className="ml-1">-</span>
                                ) : (
                                    data.recipe.cautions.map((element) => (
                                        <span key={element} className="ml-1">
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
                    <div className="Nutrients">
                        <h3 className="text-center text-2xl pt-3">
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
                                            data.recipe.totalNutrients[element]
                                                .label
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
                        <h3 className="text-center text-2xl py-3">
                            Ingredients:
                        </h3>
                        {data.recipe.ingredients.map((element) => (
                            <div
                                key={element.food}
                                className="even:bg-dark-green p-6 flex flex-row justify-between"
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
                                    />
                                </div>
                                <div className="IngredientInfo pl-6 w-1/2 flex flex-col items-center justify-evenly">
                                    <h6 className="capitalize">
                                        {element.food}
                                    </h6>
                                    <p className="capitalize">
                                        {Math.round(element.quantity * 100) /
                                            100}{" "}
                                        {element.measure}
                                    </p>
                                    <p>
                                        Weight:{" "}
                                        {Math.round(element.weight * 100) / 100}{" "}
                                        g
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
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
            `https://api.edamam.com/api/recipes/v2/${context.query.id}?type=public&app_id=f8fcabcc&app_key=0da9a134a6f9ec4433fb763b0e306aed`
        )
        .then((res) => res.data);
    // console.log("fetched data", fetchedData);
    return {
        props: {
            data: fetchedData,
        },
    };
}