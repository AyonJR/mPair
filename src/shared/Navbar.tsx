"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect} from "react";

const Navbar = () => {
    const { status, data: session } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState(null);
  
    const fetchAccountHeads = async () => {
      try {
        const userEmail = session?.user?.email;
        console.log("User Email:", userEmail);
  
        if (!userEmail) {
          console.error("User email not found.");
          return;
        }
  
        const response = await fetch(`/api/getUser?email=${userEmail}`);
        console.log("API Response Status:", response.status);
  
        if (response.ok) {
          const result = await response.json();
          console.log("API Response Data:", result);
          setUserData(result || {});
        } else {
          console.error("Failed to fetch account heads");
        }
      } catch (error) {
        console.error("Error fetching account heads:", error);
      }
    };
  
    useEffect(() => {
      if (status === "authenticated") {
        fetchAccountHeads();
      }
    }, [status]);
  
    if (status === "loading") {
      return <p>Loading...</p>;
    }
  
    if (status === "unauthenticated") {
      router.push("/");
      return null;
    }

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
           <div className="flex gap-2 items-center">
            <div>
              <p className="text-white font-medium">{userData?.fullName}</p>
              <p className="text-white text-sm">{userData?.position}</p>
            </div>
            <div>
            <Image
              src="https://i.ibb.co/thgH3p8/Ellipse-20.png"
              height={50}
              width={50}
              alt="User Profile"
              className="cursor-pointer rounded-full"
            />
            </div>
           </div>
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
