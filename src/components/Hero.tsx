import React from "react";

const Hero = () => {
  return (
    <div className="-z-10 h-screen snap-start bg-hero bg-cover">
      <div className="flex h-full flex-col justify-center border-b-2 border-dark-green bg-gradient-to-tl from-transparent to-dark px-6 pt-24 sm:px-12 md:px-16 lg:px-24 ">
        <h1 className="text-4xl font-light text-light md:w-1/2 lg:text-5xl xl:w-1/3">
          Feed Your Hunger, Discover Your Flavor: The Ultimate Food Experience
        </h1>
        <h2 className="w-4/5 pt-10 font-light text-light opacity-70 md:w-1/2 lg:text-3xl xl:w-1/4">
          Find Your Perfect Meal, Anytime, Anywhere with our Food App
        </h2>
      </div>
    </div>
  );
};

export default Hero;
