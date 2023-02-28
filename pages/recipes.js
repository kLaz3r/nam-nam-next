import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import axios from "axios";
import React, { useEffect } from "react";
import response from "../response.json";

const recipes = ({ response }) => {
    return (
        <Layout>
            <div className="pt-32 pb-6 grid grid-cols-2 px-6 gap-6 bg-dark">
                {response.hits.map((element) => (
                    <RecipeCard data={element} />
                ))}
            </div>
        </Layout>
    );
};

export default recipes;

export async function getServerSideProps(context) {
    let dataProp = {};
    // axios
    //     .get(
    //         "https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=f8fcabcc&app_key=0da9a134a6f9ec4433fb763b0e306aed"
    //     )
    //     .then((res) => res.data)
    //     .then((data) => {
    //         dataProp = data;
    //     });
    return {
        props: {
            response,
        }, // will be passed to the page component as props
    };
}
