import Layout from "@/components/Layout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Error = () => {
    const router = useRouter();
    console.log(router.query.errorCode);
    return (
        <>
            <Head>
                <title>Nam-Nam | {router.query.errorCode}</title>
            </Head>
            <Layout>
                <div className="h-screen pt-24 flex justify-center items-center max-w-xl mx-auto px-6">
                    <h1 className="text-3xl">
                        {router.query.errorCode}. Please wait 5 minutes before
                        making another request. Or report the error to the{" "}
                        <Link
                            className="text-dark-green border-b-2 border-light hover:text-light hover:border-dark-green active:text-light active:border-dark-green transition-all
                            "
                            href="https://github.com/kLaz3r"
                        >
                            developer
                        </Link>
                    </h1>
                </div>
            </Layout>
        </>
    );
};

export default Error;
