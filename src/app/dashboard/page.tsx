"use client";
import YearlyAccountAnalysis from "./components/YearlyAccountAnalysis";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [cards, setCards] = useState([
    {
      bgColor: "#F6DBDB", // Background color
      textColor: "#FF5F5F", // Text color
      amount: "Loading...", // Placeholder amount
      title: "Total Debit",
      subtitle: "This month",
    },
    {
      bgColor: "#E0F6DB",
      textColor: "#21DF10",
      amount: "Loading...", // Placeholder amount
      title: "Total Credit",
      subtitle: "This month",
    },
    {
      bgColor: "#F6EBDB",
      textColor: "#E49700",
      amount: "Loading...", // Placeholder amount
      title: "Total Savings",
      subtitle: "This month",
    },
  ]);

  const fetchAccountingData = async () => {
    try {
      if (!session?.user?.email) {
        console.error("User email not found");
        return;
      }

      const response = await fetch(
        `/api/getAccountingData?email=${session.user.email}`
      );

      if (response.ok) {
        const data = await response.json();

        // Check if accountingEntries exist and are an array
        if (!data?.accountingEntries || !Array.isArray(data.accountingEntries)) {
          console.error("Invalid data format received");
          return;
        }

        const accountingData = data.accountingEntries;

        // Calculate the total debit and credit only if data is valid
        const totalDebit = accountingData
          .filter((item) => item.accountType === "debit")
          .reduce((sum, item) => sum + item.amount, 0);

        const totalCredit = accountingData
          .filter((item) => item.accountType === "credit")
          .reduce((sum, item) => sum + item.amount, 0);

        const totalSavings = totalDebit - totalCredit;

        // Update the cards with calculated values
        const updatedCards = [
          {
            ...cards[0],
            amount: `${totalDebit} TK`, // Total Debit
          },
          {
            ...cards[1],
            amount: `${totalCredit} TK`, // Total Credit
          },
          {
            ...cards[2],
            amount: `${totalSavings} TK`, // Total Savings (Debit - Credit)
          },
        ];

        setCards(updatedCards);
      } else {
        console.error("Failed to fetch accounting data");
      }
    } catch (error) {
      console.error("Error fetching accounting data:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAccountingData();
    }
  }, [status]);

  return (
    <div>
      {/* Cards Section */}
      <div className="flex justify-evenly gap-5">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-[350px] rounded-lg"
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="p-6">
              <div className="flex justify-end">
                <h2
                  className="text-xl font-bold"
                  style={{ color: card.textColor }}
                >
                  {card.amount}
                </h2>
              </div>
              <div className="mt-5">
                <h2 className="text-lg text-[#868686] font-semibold">
                  {card.title}
                </h2>
                <p className="text-[#5E5E5E]">{card.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Yearly Account Analysis Component */}
      <div>
        <YearlyAccountAnalysis />
      </div>
    </div>
  );
};

export default DashboardPage;
