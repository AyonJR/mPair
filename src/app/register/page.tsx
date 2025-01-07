"use client";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const RegisterForm = () => {
  const handleSignup = async (event) => {
    event.preventDefault();

    // Collect form data
    const newUser = {
      fullName: event.target.fullName.value,
      gender: event.target.gender.value,
      dob: event.target.dob.value,
      email: event.target.email.value,
      empId: event.target.empId.value,
      position: event.target.position.value,
      password: event.target.password.value,
    };

    try {
      // Post data using axios
      const response = await axios.post(
        "http://localhost:3001/register/api",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server:", response.data);
      toast.success("User registered successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
      toast.error("Failed to register user.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <div className="w-full max-w-[414px] mx-auto p-[43px] bg-[#F4FAFC] shadow-lg border-t-4 border-[#2397C8]">
        <h2 className="text-2xl font-semibold mb-2 text-primaryBg">
          Welcome to PureLedger
        </h2>
        <p className="text-[#9E9E9E] mb-10">Fill up this form to register</p>
        <form onSubmit={handleSignup} className="flex flex-col space-y-6">
          <div className="w-full">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full name"
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring focus:ring-primaryBg bg-white"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <select
                id="gender"
                name="gender"
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring text-[#9E9E9E] focus:ring-primaryBg bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="w-1/2">
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring text-[#9E9E9E] focus:ring-primaryBg bg-white appearance-none"
              />
            </div>
          </div>
          <div className="w-full">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring focus:ring-primaryBg bg-white"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              id="empId"
              name="empId"
              placeholder="Employment ID"
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring focus:ring-primaryBg bg-white"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              id="position"
              name="position"
              placeholder="Position in organization"
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring focus:ring-primaryBg bg-white"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring focus:ring-primaryBg bg-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-primaryBg text-white py-2 px-4 rounded-sm hover:bg-opacity-80 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterForm;
