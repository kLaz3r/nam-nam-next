/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { type AxiosError } from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Layout from "~/components/Layout";

// Types

export interface Response1 {
  recipe: Recipe;
  _links: Links;
}

export interface Links {
  self: Self;
}

export interface Self {
  title: string;
  href: string;
}

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  images: Images;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string[];
  dishType: string[];
  totalNutrients: { [key: string]: Total };
  totalDaily: { [key: string]: Total };
  digest: Digest[];
}

export interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: null | string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: Unit;
  sub?: Digest[];
}

export enum Unit {
  Empty = "%",
  G = "g",
  Kcal = "kcal",
  Mg = "mg",
  Μg = "µg",
}

export interface Images {
  THUMBNAIL: Large;
  SMALL: Large;
  REGULAR: Large;
  LARGE: Large;
}

export interface Large {
  url: string;
  width: number;
  height: number;
}

export interface Ingredient {
  text: string;
  quantity: number;
  measure: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
}

export interface Total {
  label: string;
  quantity: number;
  unit: Unit;
}

type AxiosResponse = {
  data: Response1;
};

type Props = {
  data: Response1;
};

const ID = ({ data }: Props) => {
  const router = useRouter();
  const defaultQuery = {
    searchQuery: "",
    diet: "",
    cuisineType: "",
    mealType: "",
    dishType: "",
    _cont: "",
  };
  const handleClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    type NewQuery = {
      [key: string]: string;
    };
    const newQuery: NewQuery = {
      ...defaultQuery,
    };
    if (e.currentTarget.innerHTML === "lunch/dinner") {
      newQuery[e.currentTarget.id] = "lunch";
      await router.push({
        pathname: "/recipes",
        query: newQuery,
      });
      return;
      // Fuck you API
    }
    newQuery[e.currentTarget.id] = e.currentTarget.innerHTML.toLowerCase();
    await router.push({
      pathname: "/recipes",
      query: newQuery,
    });
  };
  return (
    <>
      <Head>
        <title>Nam-Nam | {data.recipe.label}</title>
        <meta name="description" content="Food Database with Edamam API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="Wrapper mx-auto flex min-h-screen max-w-lg flex-col border-b-2 border-dark-green bg-dark pb-6 pt-24 text-light lg:max-w-5xl xl:max-w-none">
          <div className="ImageWrapper max-h-4xl relative mx-6 mt-6 h-96 md:w-1/3 xl:mx-auto xl:max-w-5xl">
            <Image
              className="object-cover"
              src={data.recipe.image}
              fill
              priority
              alt={data.recipe.label}
            />
          </div>
          <div className="RecipeInfo lg mt-3 grid w-full grid-cols-1 gap-6 md:mx-6 lg:mx-auto lg:max-w-5xl lg:grid-cols-3 xl:pt-2">
            <div className="basicInfo px-6">
              <h1 className="RecipeLabel pb-4 text-center text-2xl">
                {data.recipe.label}
              </h1>
              <div className="dishType flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Dish Type:</span>{" "}
                <div className="Labels flex flex-row flex-wrap justify-end gap-1">
                  {data.recipe.dishType == undefined ? (
                    <span className="ml-1 bg-bittersweet px-2 py-1 font-normal capitalize text-dark">
                      -
                    </span>
                  ) : (
                    data.recipe.dishType.map((element) => (
                      <span
                        key={element}
                        onClick={(e) => handleClick(e)}
                        id="dishType"
                        className="cursor-pointer bg-light-green px-2 py-1 font-normal capitalize text-dark transition-all hover:bg-bittersweet hover:text-light"
                      >
                        {element}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="mealType flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Meal Type:</span>{" "}
                <div className="Labels flex flex-row flex-wrap justify-end gap-1">
                  {data.recipe.mealType == undefined ? (
                    <span className="ml-1 bg-bittersweet px-2 py-1 font-normal capitalize text-dark">
                      -
                    </span>
                  ) : (
                    data.recipe.mealType.map((element) => (
                      <span
                        id="mealType"
                        key={element}
                        onClick={(e) => handleClick(e)}
                        className=" cursor-pointer bg-light-green px-2 py-1 font-normal capitalize text-dark transition-all hover:bg-bittersweet hover:text-light"
                      >
                        {element}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="cuisineType flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Cuisine Type:</span>{" "}
                <div className="Labels flex flex-row flex-wrap justify-end gap-1">
                  {data.recipe.cuisineType == undefined ? (
                    <span className="ml-1 bg-bittersweet px-2 py-1 font-normal capitalize text-dark">
                      -
                    </span>
                  ) : (
                    data.recipe.cuisineType.map((element) => (
                      <span
                        id="cuisineType"
                        key={element}
                        onClick={(e) => handleClick(e)}
                        className="cursor-pointer  bg-light-green px-2 py-1 font-normal capitalize text-dark transition-all hover:bg-bittersweet hover:text-light"
                      >
                        {element}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="dietLabels flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Diet Labels:</span>{" "}
                <div className="Labels flex flex-row flex-wrap justify-end gap-1">
                  {data.recipe.dietLabels.length === 0 ? (
                    <span className="ml-1 bg-bittersweet px-2 py-1 font-normal capitalize text-dark">
                      -
                    </span>
                  ) : (
                    data.recipe.dietLabels.map((element) => (
                      <span
                        id="diet"
                        key={element}
                        onClick={(e) => handleClick(e)}
                        className="cursor-pointer  bg-light-green px-2 py-1 font-normal capitalize text-dark transition-all hover:bg-bittersweet hover:text-light"
                      >
                        {element}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="calories flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Calories:</span>{" "}
                <div className="Labels overflow-hidden">
                  <span>{Math.floor(data.recipe.calories)}</span>
                </div>
              </div>
              <div className="cautions flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Cautions:</span>{" "}
                <div className="Labels overflow-hidden">
                  {data.recipe.cautions.length === 0 ? (
                    <span className="ml-1">-</span>
                  ) : (
                    data.recipe.cautions.map((element: string) => (
                      <span key={element} className="ml-1">
                        {element}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="totalTime flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Time to Prepare:</span>{" "}
                <div className="Labels overflow-hidden">
                  <span className="ml-1">{data.recipe.totalTime} min</span>
                </div>
              </div>
              <div className="totalWeight flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Weight:</span>{" "}
                <div className="Labels overflow-hidden">
                  <span className="ml-1">
                    {Math.floor(data.recipe.totalWeight)} g
                  </span>
                </div>
              </div>
              <div className="yield flex flex-row items-center justify-between border-b border-dotted border-dark-green pt-2 pb-2 font-light">
                <span>Yield:</span>{" "}
                <div className="Labels overflow-hidden">
                  <span className="ml-1">{data.recipe.yield}</span>
                </div>
              </div>
            </div>
            <div className="Nutrients px-6">
              <p className="pt-3 pb-4 text-center text-2xl xl:pt-0">
                Total Nutrients:
              </p>
              {Object.keys(data.recipe.totalNutrients).map((element) => (
                <div
                  key={data.recipe.totalNutrients[element]?.label}
                  className="flex justify-between border-b border-dotted border-dark-green py-1"
                >
                  <span>{data.recipe.totalNutrients[element]?.label}:</span>
                  <div>
                    <span>
                      {Math.round(
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        data.recipe.totalNutrients[element]!.quantity * 100
                      ) / 100}
                    </span>

                    <span> {data.recipe.totalNutrients[element]?.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="Ingredients">
              <p className="py-3 pb-4 text-center text-2xl xl:pt-0">
                Ingredients:
              </p>
              {data.recipe.ingredients.map((element) => (
                <div
                  key={element.food}
                  className="flex flex-row justify-between p-6 odd:bg-dark-green"
                >
                  <div className="ImageWrapper relative h-36 w-1/2">
                    <Image
                      src={
                        element.image
                          ? element.image
                          : "/assets/placeholder.png"
                      }
                      className="object-cover"
                      fill
                      alt={element.food}
                    />
                  </div>
                  <div className="IngredientInfo flex w-1/2 flex-col items-center justify-evenly pl-6">
                    <p className="capitalize">{element.food}</p>
                    <p className="capitalize">
                      {Math.round(element.quantity * 100) / 100}{" "}
                      {element.measure}
                    </p>
                    <p>Weight: {Math.round(element.weight * 100) / 100} g</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            href={data.recipe.url}
            className="GoToRecipe top-28 z-50 mx-auto mt-2 w-full max-w-sm py-2 text-center text-xl drop-shadow-2xl"
          >
            <p className="mt-2 w-full bg-bittersweet py-2 text-center text-xl text-dark">
              Go To Instructions
            </p>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default ID;

export async function getServerSideProps(context: {
  query: { id: undefined | string };
}) {
  if (context.query.id == undefined) {
    return {
      redirect: {
        destination: "/error",
      },
    };
  }
  // console.log(
  //   `https://api.edamam.com/api/recipes/v2/${context.query.id}?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
  // );

  try {
    const { data }: AxiosResponse = await axios.get(
      `https://api.edamam.com/api/recipes/v2/${context.query.id}?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
    );
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    const error = e as AxiosError;
    // console.log(error.code);
    return {
      redirect: {
        destination: `/error?errorCode=${error.code}`,
      },
    };
  }
}
