import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../assets/logo.png";

const Header = () => {
    return (
        <div className="z-10 fixed w-full top-0 h-24 bg-dark-green flex justify-between items-center text-light">
            <Link href="/">
                <Image
                    alt="Logo"
                    className="h-auto w-40 ml-10"
                    src={logo}
                ></Image>
            </Link>
            <span className="flex flex-col mr-10 text-light">
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
