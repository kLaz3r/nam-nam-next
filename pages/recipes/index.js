import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import SearchInput from "@/components/SearchInput";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Recipes = (props) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        if (props.data !== null) {
            setData(props.data);
        } else {
            setData(null);
        }
    }, [props]);
    const router = useRouter();
    const [queryFilters, setQueryFilters] = useState(
        router.query.searchQuery == undefined
            ? {
                  searchQuery: "",
                  diet: "",
                  cuisineType: "",
                  mealType: "",
                  dishType: "",
              }
            : {
                  ...router.query,
              }
    );
    const [error, setError] = useState(false);

    const routerQuery = {
        pathname: "/recipes",
        query: queryFilters,
    };
    const handleSearch = () => {
        // console.log(queryFilters.searchQuery);
        // console.log(queryFilters.diet);
        // console.log(queryFilters.cuisineType);
        // console.log(queryFilters.mealType);
        // console.log(queryFilters.dishType);
        if (
            queryFilters.searchQuery === "" &&
            queryFilters.diet === "" &&
            queryFilters.cuisineType === "" &&
            queryFilters.mealType === "" &&
            queryFilters.dishType === ""
        ) {
            setError(true);
            return;
        }
        setError(false);
        router.push(routerQuery);
    };

    const changeHandler = (event) => {
        let changedId = event.target.id;
        let changedValue = event.target.value;
        switch (changedId) {
            case "search":
                setQueryFilters({
                    ...queryFilters,
                    searchQuery: changedValue,
                });
                break;
            case "Cuisine Type":
                setQueryFilters({
                    ...queryFilters,
                    cuisineType: changedValue == "" ? "" : changedValue,
                });
                break;
            case "Diet":
                setQueryFilters({
                    ...queryFilters,
                    diet: changedValue == "" ? "" : changedValue,
                });
                break;
            case "Meal Type":
                setQueryFilters({
                    ...queryFilters,
                    mealType: changedValue == "" ? "" : changedValue,
                });
                break;
            case "Dish Type":
                setQueryFilters({
                    ...queryFilters,
                    dishType: changedValue == "" ? "" : changedValue,
                });
                break;
        }
    };
    return (
        <>
            <Head>
                <title>Nam-Nam | Recipes</title>
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
                <div className="Wrapper pt-32 pb-6 px-6 min-h-screen bg-dark">
                    <SearchInput
                        queryFilters={queryFilters}
                        changeHandler={changeHandler}
                        handleSearch={handleSearch}
                        error={error}
                        setError={setError}
                    />
                    {!data ? (
                        <div className="NoData h-full flex w-full justify-center items-center pt-6">
                            <p>Search something in the input above.</p>
                        </div>
                    ) : (
                        <>
                            <div className="Info py-6 opacity-80">
                                Displaying from {data.from} to {data.to} of
                                total {data.count}
                            </div>
                            <div className="RecipeContainer grid grid-cols-2  gap-6 ">
                                {data.hits.map((element) => (
                                    <RecipeCard
                                        key={element.label}
                                        data={element}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Recipes;

export async function getServerSideProps(context) {
    if (context.query.searchQuery == undefined) {
        console.log("no query");
        return {
            props: {
                data: null,
            },
        };
    }
    const searchQuery =
        context.query.searchQuery == ""
            ? ""
            : `&q=${context.query.searchQuery}`;
    const diet = context.query.diet == "" ? "" : `&diet=${context.query.diet}`;
    const cuisineType =
        context.query.cuisineType == ""
            ? ""
            : `&cuisineType=${context.query.cuisineType}`;
    const mealType =
        context.query.mealType == ""
            ? ""
            : `&mealType=${context.query.mealType}`;
    const dishType =
        context.query.dishType == ""
            ? ""
            : `&dishType=${context.query.dishType}`;
    const dataFetched = await axios
        .get(
            `https://api.edamam.com/api/recipes/v2?type=public${searchQuery}${diet}${cuisineType}${mealType}${dishType}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
        )
        .then((res) => res.data);

    return {
        props: {
            data: dataFetched,
        },
    };
}
