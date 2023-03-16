import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import SearchInput from "@/components/SearchInput";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Recipes = (props) => {
    const [data, setData] = useState(null);
    console.log(props.data);
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
                  _cont: "",
              }
            : {
                  ...router.query,
                  _cont: "",
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
    const nextPageHandler = async () => {
        if (props.data._links.next.href == undefined) {
            return "";
        } else {
            const link = data._links.next.href;
            const contID = await link.match(/\b[0-9A-za-z%-]{33,200}\b/);
            console.log(contID[0]);
            console.log({
                ...router.query,
                _cont: contID[0],
            });
            router.push({
                pathname: "/recipes",
                query: {
                    ...router.query,
                    _cont: contID[0],
                },
            });
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
                <div className="Wrapper pt-32 pb-6 px-6 min-h-screen bg-dark border-b-2 border-dark-green">
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
                            <div className="RecipeContainer grid grid-cols-2  gap-6  md:grid-cols-4 2xl:grid-cols-5">
                                {data.hits.map((element) => (
                                    <RecipeCard
                                        key={element.label}
                                        data={element}
                                    />
                                ))}
                            </div>
                            {props.data._links.next !== undefined && (
                                <div
                                    onClick={nextPageHandler}
                                    className="NextPage cursor-pointer hover:bg-dark-green transition text-center py-3 mt-6 mx-auto bg-bittersweet w-2/3 max-w-sm"
                                >
                                    Next Page
                                </div>
                            )}
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
    const continuation =
        context.query._cont == "" ? "" : `&_cont=${context.query._cont}`;
    // console.log(
    //     `https://api.edamam.com/api/recipes/v2?type=public${searchQuery}${diet}${cuisineType}${mealType}${dishType}${continuation}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
    // );
    try {
        const response = await axios
            .get(
                `https://api.edamam.com/api/recipes/v2?type=public${searchQuery}${diet}${cuisineType}${mealType}${dishType}${continuation}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
            )
            .then((res) => res.data);
        return {
            props: {
                data: response,
            },
        };
    } catch (error) {
        console.log(error.code);
        return {
            redirect: {
                destination: `/error?errorCode=${error.code}`,
            },
        };
    }
}
