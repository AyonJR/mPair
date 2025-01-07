import YearlyAccountAnalysis from "./components/YearlyAccountAnalysis";

const DashboardPage = () => {
  const cards = [
    {
      bgColor: "#F6DBDB", // Background color
      textColor: "#FF5F5F", // Text color
      amount: "32,000 TK",
      title: "Total Debit",
      subtitle: "This month",
    },
    {
      bgColor: "#E0F6DB",
      textColor: "#21DF10",
      amount: "32,000 TK",
      title: "Total Credit",
      subtitle: "This month",
    },
    {
      bgColor: "#F6EBDB",
      textColor: "#E49700",
      amount: "32,000 TK",
      title: "Total Savings",
      subtitle: "This month",
    },
  ];

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
