import {
    DiscordLogoIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
    PersonIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import edamam from "../assets/edamam.svg";

const Footer = () => {
    const router = useRouter();
    console.log(router.pathname);
    let snapClass = "";
    if (router.pathname == "/") {
        snapClass = "snap-end";
    } else {
        snapClass = "";
    }
    return (
        <div
            className={`${snapClass} h-48 md:h-32 px-6 py-6 sm:px-12 md:px-16 lg:px-24 flex flex-col md:flex-row justify-center md:justify-between items-center`}
        >
            <div className="SocialButtons justify-center md:justify-start h-full flex flex-row gap-6 w-full pb-3 md:pb-0">
                <Link href="https://github.com/kLaz3r">
                    <GitHubLogoIcon className="h-full w-full text-dark-green hover:text-bittersweet active:text-bittersweet transition-all" />
                </Link>
                <Link href="https://discordapp.com/users/240478370620506112">
                    <DiscordLogoIcon className="h-full w-full text-dark-green hover:text-bittersweet active:text-bittersweet transition-all" />
                </Link>
                <Link href="https://www.linkedin.com/in/stefan-nasturas-9bb019207/">
                    <LinkedInLogoIcon className="h-full w-full text-dark-green hover:text-bittersweet active:text-bittersweet transition-all" />
                </Link>
                <Link href="https://stefan-nasturas.netlify.app/">
                    <PersonIcon className="h-full w-full text-dark-green hover:text-bittersweet active:text-bittersweet transition-all" />
                </Link>
            </div>

            <div className="CopyrightText">
                <div className="ImageWrapper relative h-12 w-full">
                    <Image src={edamam} fill></Image>
                </div>
                <p className="opacity-70 inline-block text-xs w-full text-center">
                    &copy; Copyright 2023, Stefan Nasturas. All rights reserved.{" "}
                </p>
            </div>
        </div>
    );
};

export default Footer;
