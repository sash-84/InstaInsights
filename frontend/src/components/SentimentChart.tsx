import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SentimentChart = ({ sentimentData }) => {
  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Sentiment Count",
        data: [sentimentData.Positive, sentimentData.Neutral, sentimentData.Negative],
        backgroundColor: ["#34D399", "#FBBF24", "#EF4444"], // Softer Tailwind colors
        borderColor: ["#059669", "#D97706", "#B91C1C"], // Darker shades for contrast
        borderWidth: 2,
        borderRadius: 8, // Rounded bars for a modern look
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const},
      tooltip: { enabled: true, backgroundColor: "rgba(0,0,0,0.7)", titleColor: "#fff" },
    },
    scales: {
      x: {
        grid: { display: false }, // Remove unnecessary grid lines
      },
      y: {
        grid: { color: "rgba(200, 200, 200, 0.2)" }, // Light grid lines
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="w-full md:w-2/3 mx-auto bg-gradient-to-r from-white via-gray-100 to-white p-6 rounded-2xl shadow-xl mb-20">
      <h3 className="text-2xl font-extrabold text-gray-800 text-center mb-4">
        📊 Sentiment Distribution
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SentimentChart;
