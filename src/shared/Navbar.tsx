"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const session = useSession();
  console.log(session);

  return (
    <div className="w-full h-[70px]">
      {/* Navbar container */}
      <div className="h-full w-full bg-primaryBg flex justify-between items-center px-6">
        {/* Left Side: Logo */}
        <div className="flex-shrink-0">
          <Image
            src="https://i.ibb.co/vQ60kVG/Pure-Ledger-1.png"
            height={50}
            width={72}
            alt="Pure Ledger Logo"
          />
        </div>

        {/* Right Side: Login Button */}
        <div className="ml-auto flex-shrink-0">
          <button className="bg-primaryBg text-white py-2 px-4 rounded-sm hover:bg-opacity-80">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
