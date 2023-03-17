/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios, { type AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import RecipeCard from "~/components/RecipeCard";
import SearchInput from "~/components/SearchInput";

export interface Response {
  from: number;
  to: number;
  count: number;
  _links: ResponseLinks;
  hits: Hit[];
}

export interface ResponseLinks {
  next: Next;
}

export interface Next {
  href: string;
  title: Title;
}

export enum Title {
  NextPage = "Next page",
  Self = "Self",
}

export interface Hit {
  recipe: Recipe;
  _links: HitLinks;
  label: string;
}

export interface HitLinks {
  self: Next;
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
  dietLabels: DietLabel[];
  healthLabels: string[];
  cautions: Caution[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalWeight: number;
  totalTime: number;
  cuisineType: CuisineType[];
  mealType: MealType[];
  dishType?: string[];
  totalNutrients: { [key: string]: Total };
  totalDaily: { [key: string]: Total };
  digest: Digest[];
}

export enum Caution {
  Fodmap = "FODMAP",
  Sulfites = "Sulfites",
  Wheat = "Wheat",
}

export enum CuisineType {
  Caribbean = "caribbean",
}

export enum DietLabel {
  Balanced = "Balanced",
  HighFiber = "High-Fiber",
  HighProtein = "High-Protein",
  LowCarb = "Low-Carb",
  LowFat = "Low-Fat",
  LowSodium = "Low-Sodium",
}

export interface Digest {
  label: string;
  tag: string;
  schemaOrgTag: SchemaOrgTag | null;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: Unit;
  sub?: Digest[];
}

export enum SchemaOrgTag {
  CarbohydrateContent = "carbohydrateContent",
  CholesterolContent = "cholesterolContent",
  FatContent = "fatContent",
  FiberContent = "fiberContent",
  ProteinContent = "proteinContent",
  SaturatedFatContent = "saturatedFatContent",
  SodiumContent = "sodiumContent",
  SugarContent = "sugarContent",
  TransFatContent = "transFatContent",
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
  LARGE?: Large;
}

export interface Large {
  url: string;
  width: number;
  height: number;
}

export interface Ingredient {
  text: string;
  quantity: number;
  measure: null | string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
}

export enum MealType {
  Brunch = "brunch",
  LunchDinner = "lunch/dinner",
}

export interface Total {
  label: string;
  quantity: number;
  unit: Unit;
}

type Props = {
  data: Response | null;
};

type QueryFilters = {
  [key: string]: string;
};

const Recipes = (props: Props) => {
  const [data, setData] = useState({} as Response | null);
  // console.log(props.data);
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
      ? ({
          searchQuery: "",
          diet: "",
          cuisineType: "",
          mealType: "",
          dishType: "",
          _cont: "",
        } as QueryFilters)
      : ({
          ...router.query,
          _cont: "",
        } as QueryFilters)
  );
  const [error, setError] = useState(false);

  const routerQuery = {
    pathname: "/recipes",
    query: queryFilters,
  };
  const handleSearch = async () => {
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
    await router.push(routerQuery);
  };

  const changeHandler = (event: React.ChangeEvent<Element>) => {
    const target = event.target as HTMLInputElement;
    const changedId = target.id;
    const changedValue = target.value;
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
    if (props.data?._links.next.href == undefined) {
      return "";
    } else {
      const link = data?._links.next.href;
      const contID = link?.match(/\b[0-9A-za-z%-]{33,200}\b/);
      // console.log(contID[0]);
      // console.log({
      //   ...router.query,
      //   _cont: contID[0],
      // });
      if (contID == null) {
        return;
      }
      await router.push({
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
        <meta name="description" content="Food Database with Edamam API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="Wrapper min-h-screen border-b-2 border-dark-green bg-dark px-6 pt-32 pb-6">
          <SearchInput
            queryFilters={queryFilters}
            changeHandler={changeHandler}
            handleSearch={handleSearch}
            error={error}
            setError={setError}
          />
          {data === null ? (
            <div className="NoData flex h-full w-full items-center justify-center pt-6">
              <p>Search something in the input above.</p>
            </div>
          ) : (
            <>
              <div className="Info py-6 opacity-80">
                Displaying from {data.from} to {data.to} of total {data.count}
              </div>
              <div className="RecipeContainer grid grid-cols-1 gap-6  sm:grid-cols-2  md:grid-cols-4 2xl:grid-cols-5">
                {data.hits?.map((element, index) => (
                  <RecipeCard
                    index={index}
                    key={element.label}
                    data={element}
                  />
                ))}
              </div>
              {props.data?._links.next !== undefined && (
                <div
                  onClick={nextPageHandler}
                  className="NextPage mx-auto mt-6 w-2/3 max-w-sm cursor-pointer bg-bittersweet py-3 text-center drop-shadow-lg transition hover:bg-dark-green"
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

export async function getServerSideProps(context: {
  query: {
    searchQuery: string | undefined;
    diet: string | undefined;
    cuisineType: string | undefined;
    mealType: string | undefined;
    dishType: string | undefined;
    _cont: string | undefined;
  };
}) {
  if (context.query.searchQuery == undefined) {
    // console.log("no query");
    return {
      props: {
        data: null,
      },
    };
  }
  const searchQuery =
    context.query.searchQuery == "" ? "" : `&q=${context.query.searchQuery}`;
  const diet = context.query.diet == "" ? "" : `&diet=${context.query.diet}`;
  const cuisineType =
    context.query.cuisineType == ""
      ? ""
      : `&cuisineType=${context.query.cuisineType}`;
  const mealType =
    context.query.mealType == "" ? "" : `&mealType=${context.query.mealType}`;
  const dishType =
    context.query.dishType == "" ? "" : `&dishType=${context.query.dishType}`;
  const continuation =
    context.query._cont == "" ? "" : `&_cont=${context.query._cont}`;
  // console.log(
  //   `https://api.edamam.com/api/recipes/v2?type=public${searchQuery}${diet}${cuisineType}${mealType}${dishType}${continuation}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
  // );
  try {
    const { data } = await axios.get<Response>(
      `https://api.edamam.com/api/recipes/v2?type=public${searchQuery}${diet}${cuisineType}${mealType}${dishType}${continuation}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
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
