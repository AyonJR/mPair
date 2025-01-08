"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const ReportsPage = () => {
  const [accountData, setAccountData] = useState<any[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAccountData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/getAccountingData?email=${session.user.email}`);
          const data = await response.json();

          if (data.accountingEntries && Array.isArray(data.accountingEntries)) {
            setAccountData(data.accountingEntries);
          } else {
            console.error("Invalid data structure for accounting entries:", data);
          }
        } catch (error) {
          console.error("Error fetching accounting data:", error);
        }
      }
    };

    fetchAccountData();
  }, [session]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Reports Section</h2>
      <table className="w-full table-auto text-center">
        <thead className="bg-white text-[#A3A3A3] text-sm ">
          <tr>
            <th className="p-3 font-normal">Serial</th> 
            <th className="p-3 font-normal">Account Head</th>
            <th className="p-3 font-normal">Date</th>
            <th className="p-3 font-normal">Debit</th>
            <th className="p-3 font-normal">Credit</th>
          </tr>
        </thead>
        <tbody>
          {accountData.length > 0 ? (
            accountData.map((entry, index) => (
              <tr
                key={entry._id}
                className="p-2"
              >
                <td className="p-2 bg-[#EBEBEB] text-[#656565] text-sm">{index + 1}</td>
                <td className="p-2 mt-2 bg-[#EBEBEB] text-[#656565] text-sm">{entry.head}</td>
                <td className="p-2 mt-2 bg-[#EBEBEB] text-[#656565] text-sm">{entry.date}</td>
                <td className="p-2 mt-2 bg-[#EBEBEB] text-[#656565] text-sm">{entry.accountType === "expense" || entry.accountType === "income" ? entry.amount : "-"}</td>
                <td className="p-2 mt-2 bg-[#EBEBEB] text-[#656565] text-sm">{entry.accountType === "savings" ? entry.amount : "-"}</td>
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
