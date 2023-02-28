import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import SearchInput from "@/components/SearchInput";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const recipes = (props) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        if (props.data !== null) {
            setData(props.data);
        } else {
            setData(null);
        }
    }, [props]);
    const router = useRouter();
    const [queryFilters, setQueryFilters] = useState({
        searchQuery: "",
        diet: "",
        cuisineType: "",
        mealType: "",
        dishType: "",
    });
    const [error, setError] = useState(false);

    const routerQuery = {
        pathname: "/recipes",
        query: queryFilters,
    };
    const handleSearch = () => {
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
            case "cuisineType":
                setQueryFilters({
                    ...queryFilters,
                    cuisineType: changedValue == "" ? null : changedValue,
                });
                break;
            case "diet":
                setQueryFilters({
                    ...queryFilters,
                    diet: changedValue == "" ? null : changedValue,
                });
                break;
            case "mealType":
                setQueryFilters({
                    ...queryFilters,
                    mealType: changedValue == "" ? null : changedValue,
                });
                break;
            case "dishType":
                setQueryFilters({
                    ...queryFilters,
                    dishType: changedValue == "" ? null : changedValue,
                });
                break;
        }
    };
    return (
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
                            Displaying from {data.from} to {data.to} of total{" "}
                            {data.count}
                        </div>
                        <div className="RecipeContainer grid grid-cols-2  gap-6 ">
                            {data.hits.map((element) => (
                                <RecipeCard data={element} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default recipes;

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
            `https://api.edamam.com/api/recipes/v2?type=public${searchQuery}${diet}${cuisineType}${mealType}${dishType}&app_id=f8fcabcc&app_key=0da9a134a6f9ec4433fb763b0e306aed`
        )
        .then((res) => res.data);

    return {
        props: {
            data: dataFetched,
        },
    };
}
