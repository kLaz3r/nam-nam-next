import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React, { useState } from "react";

const recipes = () => {
    const [data, setData] = useState(null);
    const router = useRouter();
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

                <div className="NoData h-full flex w-full justify-center items-center">
                    <p>Search something in the input above.</p>
                </div>
            </div>
        </Layout>
    );
};

export default recipes;

// export async function getServerSideProps(context) {
//     let dataProp = {};
//     axios
//         .get(
//             "https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=f8fcabcc&app_key=0da9a134a6f9ec4433fb763b0e306aed"
//         )
//         .then((res) => res.data)
//         .then((data) => {
//             dataProp = data;
//         });
//     return {
//         props: {
//             response,
//         },
//     };
// }
