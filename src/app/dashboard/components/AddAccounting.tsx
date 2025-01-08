"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AddAccounting = () => {
  const [accountHeads, setAccountHeads] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    date: "",
    accountType: "",
    head: "",
    amount: "",
  });

  const { data: session } = useSession();

  useEffect(() => {
    const fetchAccountHeads = async () => {
      if (session?.user?.email) {
        try {
          // Pass the email as a query parameter
          const response = await fetch(`/api/getHead?email=${session.user.email}`);
          const data = await response.json();

          if (data.accountHeads && Array.isArray(data.accountHeads)) {
            setAccountHeads(data.accountHeads);
          } else {
            console.error("Invalid data structure for account heads:", data);
          }
        } catch (error) {
          console.error("Error fetching account heads:", error);
        }
      } else {
        console.error("No email found in session");
      }
    };

    if (session?.user?.email) {
      fetchAccountHeads();
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Include user email from session
    const dataToSend = {
      ...formData,
      email: session?.user?.email,
    };

    try {
      const response = await fetch("/api/add-accounting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Data added successfully!");
        // Reset form or handle success
        setFormData({ date: "", accountType: "", head: "", amount: "" });
      } else {
        console.error("Error submitting form:", result);
        alert(result.message || "Failed to add data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl text-[#5E5E5E] font-semibold">Add Accounting</h2>
        <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
          {/* Choose Date */}
          <div>
            <input
              type="date"
              name="date"
              className="w-[248px] text-[#979797] mt-2 p-3 border bg-white"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          {/* Account Type Dropdown */}
          <div>
            <select
              name="accountType"
              className="w-[248px] text-[#979797] mt-2 p-3 bg-white"
              value={formData.accountType}
              onChange={handleChange}
            >
              <option value="">Select Account Type</option>
              <option value="expense">Expense</option>
              <option value="income">Debit</option>
              <option value="savings">Credit</option>
            </select>
          </div>

          {/* Choose Head Dropdown */}
          <div>
            <select
              name="head"
              className="w-[248px] text-[#979797] mt-2 p-3 bg-white"
              value={formData.head}
              onChange={handleChange}
            >
              <option value="">Select a head</option>
              {Array.isArray(accountHeads) && accountHeads.length > 0 ? (
                accountHeads.map((head) => (
                  <option key={head._id} value={head.name}>
                    {head.name}
                  </option>
                ))
              ) : (
                <option value="">No account heads available</option>
              )}
            </select>
          </div>

          {/* Amount Field */}
          <div>
            <input
              type="number"
              name="amount"
              className="w-[248px] mt-2 p-3 bg-white"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-[248px] py-3 bg-primaryBg text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccounting;
