"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles

const ReportsPage = () => {
  const [accountData, setAccountData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAccountData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(
            `/api/getAccountingData?email=${session.user.email}`
          );
          const data = await response.json();

          if (data.accountingEntries && Array.isArray(data.accountingEntries)) {
            setAccountData(data.accountingEntries);
            setFilteredData(data.accountingEntries); // Initialize filtered data
          } else {
            console.error(
              "Invalid data structure for accounting entries:",
              data
            );
          }
        } catch (error) {
          console.error("Error fetching accounting data:", error);
        }
      }
    };

    fetchAccountData();
  }, [session]);

  // Filter data based on selected date
  useEffect(() => {
    if (selectedDate) {
      const filtered = accountData.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === selectedDate.toDateString();
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(accountData); // Show all data if no date is selected
    }
  }, [selectedDate, accountData]);

  return (
    <div className="px-10">
      <div className="border-b border-[#E0E0E0] flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium text-[#656565] mb-8">Daily Report</h2>
        <div className="flex items-center gap-4 relative mb-8">
          {/* Display Selected Date */}
          {selectedDate && (
            <span className="text-sm text-[#656565]">
              {selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}

          {/* Calendar Icon */}
          <button
            onClick={() => setShowCalendar((prev) => !prev)}
            className="text-xl text-[#656565]"
          >
            <SlCalender />
          </button>

          {/* Calendar Component */}
          {showCalendar && (
            <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-md z-10">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setShowCalendar(false); // Close calendar on date select
                }}
                inline
              />
            </div>
          )}
        </div>
      </div>
      <table className="w-full table-auto text-center">
        <thead className="bg-white text-[#A3A3A3] text-sm">
          <tr>
            <th className="p-3 font-normal">Serial</th>
            <th className="p-3 font-normal">Account Head</th>
            <th className="p-3 font-normal">Date</th>
            <th className="p-3 font-normal">Debit</th>
            <th className="p-3 font-normal">Credit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((entry, index) => (
              <tr key={entry._id} className="p-2">
                <td className="p-2 bg-[#EBEBEB] text-[#656565] text-sm">
                  {index + 1}
                </td>
                <td className="p-2 mt-2 bg-[#EBEBEB] text-[#656565] text-sm">
                  {entry.head}
                </td>
                <td className="p-2 mt-2 bg-[#EBEBEB] text-[#656565] text-sm">
                  {new Date(entry.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="p-2 mt-2 bg-[#EBEBEB] text-[#656565] text-sm">
                  {entry.accountType === "expense" ||
                  entry.accountType === "income"
                    ? entry.amount
                    : "-"}
                </td>
                <td className="p-2 mt-2 bg-[#EBEBEB] text-[#656565] text-sm">
                  {entry.accountType === "savings" ? entry.amount : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-3 text-center">
                No accounting data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsPage;
