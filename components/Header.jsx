import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
    return (
        <div className="z-10 px-6 lg:px-24 sm:px-12 md:px-16 fixed w-full top-0 h-24 bg-dark-green flex justify-between items-center text-light">
            <Link href="/">
                <Image alt="Logo" className="h-auto w-40" src={logo}></Image>
            </Link>
            <span className="flex flex-col sm:flex-row sm:gap-12 text-light text-end">
                <Link
                    href="/"
                    className="text-2xl hover:text-bittersweet transition"
                >
                    Home
                </Link>
                <Link
                    href="/recipes"
                    className="text-2xl hover:text-bittersweet transition"
                >
                    Recipes
                </Link>
            </span>
        </div>
    );
};

export default Header;
