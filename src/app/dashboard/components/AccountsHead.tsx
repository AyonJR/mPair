"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const AccountsHead = () => {
  const session = useSession(); // Access user session
  console.log(useSession());
  const [showModal, setShowModal] = useState(false);
  const [accountType, setAccountType] = useState(""); // To store the selected account type
  const [name, setName] = useState(""); // To store the entered name
  const [accountHeads, setAccountHeads] = useState<any[]>([]); // To store the fetched account heads

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async () => {
    if (!accountType || !name) {
      alert("Please fill out all fields.");
      return;
    }

    if (!session) {
      alert("You must be logged in to add an account head.");
      return;
    }

    const userEmail = session?.data?.user?.email; // Ensure email is accessed safely

    if (!userEmail) {
      alert("User email not found in session. Please log in again.");
      return;
    }

    const newHead = {
      accountType,
      name,

      email: userEmail, // Include the user's email
    };

    try {
      const response = await fetch("/api/accounts-head", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHead),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Account head added successfully.");
        setShowModal(false); // Close the modal
        setAccountType(""); // Reset account type
        setName(""); // Reset name field
      } else {
        const error = await response.json();
        alert(`Failed to add account head: ${error.message}`);
      }
    } catch (error) {
      console.error("Error submitting account head:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Fetch account heads from the database when the component mounts
  const fetchAccountHeads = async () => {
    try {
      const userEmail = session?.data?.user?.email;
  
      if (!userEmail) {
        console.error("User email not found.");
        return;
      }
  
      const response = await fetch(`/api/getHead?email=${userEmail}`);
      if (response.ok) {
        const result = await response.json();
        setAccountHeads(result.accountHeads); // Store the fetched account heads in the state
      } else {
        console.error("Failed to fetch account heads");
      }
    } catch (error) {
      console.error("Error fetching account heads:", error);
    }
  };
  
  useEffect(() => {
    fetchAccountHeads(); // Call the function to fetch account heads when the component mounts
  }, []);

  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-2xl text-[#5E5E5E] font-semibold">
          Accounts Heads
        </h2>
        {/* Existing account heads list */}
        <div className="mt-7">
          <div className="w-[169px] bg-[#ECEDFA]">
            <p className="px-4 py-1 text-[#A0A0A0]">Transportation</p>
          </div>
          <div className="w-[169px] bg-[#ECEDFA] mt-2">
            {" "}
            <p className="px-4 py-1 text-[#A0A0A0]">Office maintenance</p>{" "}
          </div>{" "}
          <div className="w-[169px] bg-[#ECEDFA] mt-2">
            {" "}
            <p className="px-4 py-1 text-[#A0A0A0]">Courier cost</p>{" "}
          </div>{" "}
          <div className="w-[169px] bg-[#ECEDFA] mt-2">
            {" "}
            <p className="px-4 py-1 text-[#A0A0A0]">Stationary</p>{" "}
          </div>{" "}
          <div className="w-[169px] bg-[#ECEDFA] mt-2">
            {" "}
            <p className="px-4 py-1 text-[#A0A0A0]">Food</p>{" "}
          </div>
          {accountHeads.length > 0 ? (
            accountHeads.map((head: any) => (
              <div key={head._id} className="w-[169px] bg-[#ECEDFA] mt-2">
                <p className="px-4 py-1 text-[#A0A0A0]">{head.name}</p>
              </div>
            ))
          ) : (
            <p></p>
          )}
          {/* Add other account heads here */}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="text-primaryBg font-semibold"
            onClick={handleModalToggle}
          >
            Add Accounts Head
          </button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-[#F4FAFC] w-[400px]">
              <div className="h-1 bg-primaryBg"></div>
              <div className="p-8">
                <div className="w-full border-b border-[#9E9E9E]">
                  <h2 className="text-2xl font-semibold text-[#9E9E9E] pb-4">
                    Add Accounts Head
                  </h2>
                </div>
                <div className="flex justify-center mt-7">
                  <div className="flex items-center gap-10">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="accountType"
                        value="Debit"
                        className="w-5 h-5"
                        onChange={(e) => setAccountType(e.target.value)}
                      />
                      <span className="text-[#9E9E9E] font-medium">Debit</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="accountType"
                        value="Credit"
                        className="w-5 h-5"
                        onChange={(e) => setAccountType(e.target.value)}
                      />
                      <span className="text-[#9E9E9E] font-medium">Credit</span>
                    </label>
                  </div>
                </div>
                <div className="mt-7">
                  <input
                    type="text"
                    placeholder="Type name here"
                    className="w-full p-3 rounded-sm focus:outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-7 w-full">
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 w-full bg-primaryBg text-white rounded-md font-semibold"
                  >
                    Add Head
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountsHead;
