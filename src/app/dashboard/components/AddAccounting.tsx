"use client";
import React, { useEffect, useState } from 'react';

const AddAccounting = () => {
  const [accountHeads, setAccountHeads] = useState<any[]>([]); // Type as array of objects
  const [selectedHead, setSelectedHead] = useState(''); // To store selected head

  // Fetch the account heads from the database
  useEffect(() => {
    const fetchAccountHeads = async () => {
      try {
        const response = await fetch('/api/getHead');
        const data = await response.json();
        console.log('Fetched data:', data); // Log to check the structure of data

        // Check if accountHeads key exists and is an array
        if (data.accountHeads && Array.isArray(data.accountHeads)) {
          setAccountHeads(data.accountHeads); // Set the account heads into state if it's an array
        } else {
          console.error('Expected accountHeads array but received:', data);
        }
      } catch (error) {
        console.error('Error fetching account heads:', error);
      }
    };

    fetchAccountHeads();
  }, []); // Empty dependency array to run once when component mounts

  return (
    <div>
      <div>
        <h2 className="text-2xl text-[#5E5E5E] font-semibold">Add Accounting</h2>
        <form className="mt-5 space-y-6">
          {/* Choose Date */}
          <div>
            <input
              type="date"
              className="w-[248px] text-[#979797] mt-2 p-3 border bg-white"
            />
          </div>

          {/* Account Type Dropdown */}
          <div>
            <select className="w-[248px] text-[#979797] mt-2 p-3 bg-white">
              <option value="expense">Expense</option>
              <option value="income">Debit</option>
              <option value="savings">Credit</option>
            </select>
          </div>

          {/* Choose Head Dropdown */}
          <div>
            <select
              className="w-[248px] text-[#979797] mt-2 p-3 bg-white"
              value={selectedHead}
              onChange={(e) => setSelectedHead(e.target.value)} // Update selected head
            >
              <option value="">Select a head</option>
              {Array.isArray(accountHeads) && accountHeads.length > 0 ? (
                accountHeads.map((head) => (
                  <option key={head._id} value={head.name}> {/* Using the `name` property for display */}
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
              className="w-[248px] mt-2 p-3 bg-white"
              placeholder="Enter Amount"
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
