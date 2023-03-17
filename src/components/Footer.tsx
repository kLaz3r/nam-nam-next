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

const Footer = () => {
  const router = useRouter();
  // console.log(router.pathname);
  let snapClass = "";
  if (router.pathname == "/") {
    snapClass = "snap-end";
  } else {
    snapClass = "";
  }
  return (
    <div
      className={`${snapClass} flex h-48 flex-col items-center justify-center px-6 py-6 sm:px-12 md:h-32 md:flex-row md:justify-between md:px-16 lg:px-24`}
    >
      <div className="SocialButtons flex h-full w-full flex-row justify-center gap-6 pb-3 md:justify-start md:pb-0">
        <Link className="text-[0px]" href="https://github.com/kLaz3r">
          GitHub
          <GitHubLogoIcon className="h-full w-full text-dark-green transition-all hover:text-bittersweet active:text-bittersweet" />
        </Link>
        <Link
          className="text-[0px]"
          href="https://discordapp.com/users/240478370620506112"
        >
          Discord
          <DiscordLogoIcon className="h-full w-full text-dark-green transition-all hover:text-bittersweet active:text-bittersweet" />
        </Link>
        <Link
          className="text-[0px]"
          href="https://www.linkedin.com/in/stefan-nasturas-9bb019207/"
        >
          LinkedIn
          <LinkedInLogoIcon className="h-full w-full text-dark-green transition-all hover:text-bittersweet active:text-bittersweet" />
        </Link>
        <Link className="text-[0px]" href="https://stefannasturas.live">
          Personal Portfolio
          <PersonIcon className="h-full w-full text-dark-green transition-all hover:text-bittersweet active:text-bittersweet" />
        </Link>
      </div>

      <div className="CopyrightText">
        <div className="ImageWrapper relative h-12 w-full">
          <Image src="/assets/edamam.svg" fill alt="Edamam Logo"></Image>
        </div>
        <p className="inline-block w-full text-center text-xs opacity-70">
          &copy; Copyright 2023, Stefan Nasturas. All rights reserved.{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
