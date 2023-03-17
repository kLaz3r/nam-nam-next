import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "~/components/Layout";

const Error = () => {
  const router = useRouter();
  // console.log(router.query.errorCode);
  return (
    <>
      <Head>
        <title>Nam-Nam | {router.query.errorCode}</title>
      </Head>
      <Layout>
        <div className="mx-auto flex h-screen max-w-xl items-center justify-center px-6 pt-24">
          <h1 className="text-3xl">
            {router.query.errorCode}. Please wait 5 minutes before making
            another request. Or report the error to the{" "}
            <Link
              className="border-b-2 border-light text-dark-green transition-all hover:border-dark-green hover:text-light active:border-dark-green active:text-light
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
