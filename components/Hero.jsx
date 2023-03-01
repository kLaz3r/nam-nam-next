import Image from "next/image";
import React from "react";
import bgHero from "../assets/hero-bg.jpg";

const Hero = () => {
    return (
        <section className="h-screen">
            <Image
                src={bgHero}
                className="absolute w-full h-full object-cover -z-10 opacity-50"
                priority
                alt="Hero Image"
            />
            <div className="border-b-2 border-dark-green pt-24 h-full flex flex-col justify-center px-6 bg-gradient-to-tl from-transparent to-dark">
                <h1 className="text-4xl text-light font-light">
                    Feed Your Hunger, Discover Your Flavor: The Ultimate Food
                    Experience
                </h1>
                <h2 className="text-light opacity-70 pt-10 font-light w-4/5">
                    Find Your Perfect Meal, Anytime, Anywhere with our Food App
                </h2>
            </div>
        </section>
    );
};

export default Hero;
