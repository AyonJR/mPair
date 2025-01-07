"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const empId = e.target.empId.value;
    const password = e.target.password.value;
    const response = await signIn("credentials", {
      empId,
      password,
      redirect: false,
    });

    console.log(response);
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div
        className="w-full max-w-[414px] p-[43px] shadow-lg bg-[#F4FAFC] border-t-4"
        style={{ borderColor: "#2397C8" }}
      >
        {/* Form Heading */}
        <h2 className="text-2xl font-semibold mb-2 text-primaryBg">
          Welcome to PureLedger
        </h2>
        <p className="text-[#9E9E9E] mb-10">Please Login to Continue</p>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col  justify-start items-start"
        >
          {/* Employer ID Field */}
          <div className="mb-4 w-full">
            <label
              htmlFor="empId"
              className="block text-gray-700 font-medium mb-1"
            >
              Employer ID
            </label>
            <input
              type="text"
              id="empId"
              placeholder="Enter your Employer ID"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primaryBg"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6 relative w-full">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primaryBg"
            />
            {/* Eye Icon */}
            <div
              className="absolute top-[70%] right-4 transform -translate-y-2/4 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primaryBg text-white font-medium py-2 px-4 rounded-sm hover:bg-opacity-80"
          >
            Login
          </button>

          {/* Registration Text */}
          <div className="flex justify-center items-center mt-7 w-full">
            <p className="text-[#9E9E9E]">
              Don't have an account?{" "}
              <span className="text-primaryBg font-semibold">
                Register Now!
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
