"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const session = useSession();

  return (
    <div className="w-full h-[70px] bg-primaryBg">
      {/* Navbar Content Wrapper */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
          padding: "0 20px",
          backgroundColor: "#2397C8",
        }}
      >
        {/* Logo */}
        <Image
          src="https://i.ibb.co/vQ60kVG/Pure-Ledger-1.png"
          height={30}
          width={72}
          alt="Pure Ledger Logo"
        />

        {/* Button */}
        <button
          style={{
            backgroundColor: "#2397C8",
            color: "#fff",
            padding: "8px 22px",
            border: "1px solid white",
            borderRadius: "4px",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
