import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 z-10 flex h-24 w-full items-center justify-between bg-dark-green px-6 text-light sm:h-20 sm:px-12 md:px-16 lg:px-24">
      <Link href="/" className="relative h-24 w-48">
        <Image
          alt="Logo"
          className="h-auto w-40 object-contain"
          src="/assets/logo.png"
          fill
        ></Image>
      </Link>
      <span className="flex flex-col text-end text-light sm:flex-row sm:gap-12">
        <Link href="/" className="text-2xl transition hover:text-bittersweet">
          Home
        </Link>
        <Link
          href="/recipes"
          className="text-2xl transition hover:text-bittersweet"
        >
          Recipes
        </Link>
      </span>
    </div>
  );
};

export default Header;
