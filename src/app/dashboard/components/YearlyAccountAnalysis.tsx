import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const YearlyAccountAnalysis = ({ monthlyData = [] }) => {
  // Ensure monthlyData is always an array
  const chartData = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: " Debit",
        data: monthlyData.map((data) => data.debit || 0), // Handle missing debit values
        backgroundColor: "#FF8E5E",
        barThickness: 6,
      },
      {
        label: " Credit",
        data: monthlyData.map((data) => data.credit || 0), // Handle missing credit values
        backgroundColor: "#52E30E",
        barThickness: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    layout: {
        padding: 0, // Removes extra padding
      },
    scales: {
      x: {
        title: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
        },
      },
    },
  };

  return (
    <div className="mt-10">
      <div className="p-10 flex justify-between">
        <div>
        <h2 className="text-2xl  font-medium mb-5 text-[#4E4E4E]">
        Yearly Account Analysis
      </h2>
        </div>
        <div>
        <select
            id="year-select"
            className="ml-2 px-4 py-2 border bg-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 "
          >
            <option value="2025">Year 2025</option>
            <option value="2024">Year 2024</option>
            <option value="2023">Year 2023</option>
          </select>
        </div>
      </div>
     <div className="max-w-[1000px]">
     <Bar data={chartData} options={options} />
     </div>
    </div>
  );
};

export default YearlyAccountAnalysis;
