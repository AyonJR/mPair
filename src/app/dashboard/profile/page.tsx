"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
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
    <div className="w-full mx-auto container p-5">
      <h1 className="text-2xl font-medium mb-5">Profile Information</h1>
      <div className="flex justify-between">
        <div>
          <div className="p-5 rounded-lg flex justify-center ml-[50vh]">
            <div>
              <img
                src="https://i.ibb.co/thgH3p8/Ellipse-20.png"
                alt="Profile"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="mt-10 ml-40">
            {userData && (
              <>
                <div>
                  <h2 className="text-[#3E3E3E80] font-medium">Full Name</h2>
                  <p className="text-gray-800 font-semibold">
                    {userData.fullName || "N/A"}
                  </p>
                </div>
                <div>
                  <h2 className="text-[#3E3E3E80] font-medium mt-4">Position</h2>
                  <p className="text-gray-800 font-semibold">
                    {userData.position || "N/A"}
                  </p>
                </div>
                <div>
                  <h2 className="text-[#3E3E3E80] font-medium mt-4">Gender</h2>
                  <p className="text-gray-800 font-semibold">
                    {userData.gender || "N/A"}
                  </p>
                </div>
                <div>
                  <h2 className="text-[#3E3E3E80] font-medium mt-4">
                    Date of Birth
                  </h2>
                  <p className="text-gray-800 font-semibold">
                    {userData.dob || "N/A"}
                  </p>
                </div>
                <div>
                  <h2 className="text-[#3E3E3E80] font-medium mt-4">Email</h2>
                  <p className="text-gray-800 font-semibold">
                    {userData.email || "N/A"}
                  </p>
                </div>
                <div>
                  <h2 className="text-[#3E3E3E80] font-medium mt-4">
                    Employee Id
                  </h2>
                  <p className="text-gray-800 font-semibold">
                    {userData.empId || "N/A"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="ml-10 -mt-[90px]">
            <div className="w-[100px] bg-[#E9F5FA] h-[76px] flex flex-col justify-center items-center gap-2">
              <button
                onClick={() => router.push("/dashboard/profile")}
                className="text-primaryBg font-semibold text-sm px-3 py-1 rounded"
              >
                My Profile
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-primaryBg font-semibold text-sm px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
