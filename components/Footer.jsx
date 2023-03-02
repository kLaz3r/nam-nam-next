import {
    DiscordLogoIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
    PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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
            className={`${snapClass} h-32 px-6 py-6 flex flex-col justify-center items-center`}
        >
            <div className="SocialButtons justify-center h-full flex flex-row gap-6 w-full pb-3">
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
            <div className="CopyrightText opacity-70 text-sm w-full text-center">
                &copy; Copyright 2023, Stefan Nasturas. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
