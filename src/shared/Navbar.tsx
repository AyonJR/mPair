"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession(); // Get session data

  return (
    <div className="w-full h-[70px] bg-primaryBg">
      {/* Navbar Content Wrapper */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "70px",
          padding: "0 40px",
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

        {/* Conditional Rendering */}
        {session ? (
          <div className="relative">
            {/* Profile Image */}
            <Image
              src="https://i.ibb.co/thgH3p8/Ellipse-20.png"
              height={40}
              width={40}
              alt="User Profile"
              className="cursor-pointer rounded-full"
            />
          </div>
        ) : (
          <Link href={"/"}>
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
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
