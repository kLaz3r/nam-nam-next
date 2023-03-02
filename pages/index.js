import Hero from "@/components/Hero";
import LabelsSection from "@/components/LabelsSection";
import Layout from "@/components/Layout";
import RecipeSection from "@/components/RecipeSection";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Head>
                <title>Nam-Nam Food Database</title>
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
                <Hero />
                <RecipeSection />
                <LabelsSection />
            </Layout>
        </>
    );
}
