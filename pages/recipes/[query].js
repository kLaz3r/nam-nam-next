import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import response from "../../response.json";

const query = ({ response }) => {
    const [data, setData] = useState(null);
    const router = useRouter();
    console.log(response);
    useEffect(() => {
        setData(response);
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(false);
    const handleSearch = () => {
        if (searchQuery == "") {
            setError(true);
            return;
        }
        router.push(`/recipes/${searchQuery}`);
    };
    return (
        <Layout>
            <div className="Wrapper pt-32 pb-6 px-6 min-h-screen bg-dark">
                <div className="InputSearch pb-6 w-full flex justify-between">
                    <input
                        className="w-full py-2 px-4 border-b-2 border-transparent transition focus:border-b-light-green"
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-light-green p-2"
                        type="submit"
                    >
                        search
                    </button>
                </div>
                <div className="Info pb-6 opacity-80">
                    Displaying from {response.from} to {response.to} of total{" "}
                    {response.count}
                </div>
                <div className="RecipeContainer grid grid-cols-2  gap-6 ">
                    {response.hits.map((element) => (
                        <RecipeCard data={element} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default query;

export async function getServerSideProps(context) {
    // const router = useRouter();
    const searchQuery = context.query.query;
    let response = await axios
        .get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=f8fcabcc&app_key=0da9a134a6f9ec4433fb763b0e306aed`
        )
        .then((res) => res.data)
        .then((data) => {
            // console.log(data);
            return data;
        });
    return {
        props: {
            response,
        }, // will be passed to the page component as props
    };
}
