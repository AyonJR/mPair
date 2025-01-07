"use client";
import React, { useState } from "react";

const AccountsHead = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex justify-center">
      <div>
        <h2 className="text-2xl text-[#5E5E5E] font-semibold">
          Accounts Heads
        </h2>
        <div className="mt-7">
          <div className="w-[169px] bg-[#ECEDFA]">
            <p className="px-4 py-1 text-[#A0A0A0]">Transportation</p>
          </div>
          <div className="w-[169px] bg-[#ECEDFA] mt-2">
            <p className="px-4 py-1 text-[#A0A0A0]">Office maintenance</p>
          </div>
          <div className="w-[169px] bg-[#ECEDFA] mt-2">
            <p className="px-4 py-1 text-[#A0A0A0]">Courier cost</p>
          </div>
          <div className="w-[169px] bg-[#ECEDFA] mt-2">
            <p className="px-4 py-1 text-[#A0A0A0]">Stationary</p>
          </div>
          <div className="w-[169px] bg-[#ECEDFA] mt-2">
            <p className="px-4 py-1 text-[#A0A0A0]">Food</p>
          </div>
        </div>
        {/* Modal Button */}
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
            <div className="bg-[#F4FAFC]  w-[400px]">
              {/* Top Border */}
              <div className="h-1 bg-primaryBg "></div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Title */}
                <div className="w-full border-b border-[#9E9E9E]">
                  <h2 className="text-2xl font-semibold text-[#9E9E9E] pb-4">
                    Add Accounts Head
                  </h2>
                </div>

                {/* Radio Buttons */}
               <div className="flex justify-center">
                <div>
                <div className="flex items-center gap-10 mt-7">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="accountType"
                      value="Debit"
                      className="w-5 h-5"
                    />
                    <span className="text-[#9E9E9E] font-medium peer-checked:text-primaryBg">Debit</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="accountType"
                      value="Credit"
                      className="w-5 h-5"
                    />
                    <span className="text-[#9E9E9E] font-medium peer-checked:text-primaryBg">Credit</span>
                  </label>
                </div>
                </div>
               </div>

                {/* Input Field */}
                <div className="mt-7">
                  <input
                    type="text"
                    placeholder="Type name here"
                    className="w-full p-3  rounded-sm focus:outline-none"
                  />
                </div>

                {/* Add Head Button */}
                <div className="mt-7 w-full ">
                  <button
                    onClick={handleModalToggle}
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
