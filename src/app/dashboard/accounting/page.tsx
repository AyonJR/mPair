"use client"
import AccountsHead from "../components/AccountsHead";
import AddAccounting from "../components/AddAccounting";
import { signOut } from "next-auth/react";

const AccountingPage = () => {
  const handleProfileClick = () => {
    alert("Navigate to My Profile Page"); // Replace with actual navigation logic
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home route after logout
  };

  return (
    <div className="w-full mx-auto container">
      <div className="flex w-full justify-around">
        <div className="ml-10">
          <div className="flex w-[742px] mx-auto container bg-[#F4F4F4]">
            <div className="p-16 flex w-full items-start justify-between">
              {/* Add Accounting Div */}
              <div className="flex w-full justify-between">
                {/* Add Accounting Div */}
                <div>
                  <AddAccounting />
                </div>

                {/* Vertical Line */}
                <div className="flex items-center">
                  <div className="border-r-2 border-[#E0E0E0] h-full"></div>
                </div>

                {/* Accounts Head Div */}
                <div>
                  <AccountsHead />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="ml-10 -mt-4">
            <div className="w-[100px] bg-[#E9F5FA] h-[76px] flex flex-col justify-center items-center gap-2">
              {/* My Profile Button */}
              <button
                onClick={handleProfileClick}
                className=" text-primaryBg font-semibold text-sm px-3 py-1 rounded "
              >
                My Profile
              </button>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
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

export default AccountingPage;
