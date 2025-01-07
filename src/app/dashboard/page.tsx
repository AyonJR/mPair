import YearlyAccountAnalysis from "./components/YearlyAccountAnalysis";

const DashboardPage = () => {
    const cards = [
      {
        bgColor: "#F6DBDB",
        textColor: "#FF5F5F",
        amount: "32,000 TK",
        title: "Total Debit",
        subtitle: "This month",
      },
      {
        bgColor: "#E0F6DB",
        textColor: "#21DF10",
        amount: "32,000 TK",
        title: "Total Debit",
        subtitle: "This month",
      },
      {
        bgColor: "#F6EBDB",
        textColor: "#E49700",
        amount: "32,000 TK",
        title: "Total Debit",
        subtitle: "This month",
      },
    ];
  
    return (
      <div>
        {/* all the cards */}
        <div className="flex justify-evenly gap-5">
          {cards.map((card, index) => (
            <div key={index} className={`bg-[${card.bgColor}] w-[350px] rounded-lg`}>
              <div className="p-6">
                <div className="flex justify-end">
                  <h2 className={`text-xl text-[${card.textColor}] font-bold`}>
                    {card.amount}
                  </h2>
                </div>
                <div className="mt-5">
                  <h2 className="text-lg text-[#868686] font-semibold">{card.title}</h2>
                  <p className="text-[#5E5E5E]">{card.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
            <YearlyAccountAnalysis></YearlyAccountAnalysis>
        </div>
      </div>
    );
  };
  
  export default DashboardPage;
  