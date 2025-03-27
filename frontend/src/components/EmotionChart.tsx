import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmotionChart = ({ emotionData }) => {
  if (!emotionData || Object.keys(emotionData).length === 0) return null;

  const labels = Object.keys(emotionData);
  const dataValues = Object.values(emotionData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Emotion Count",
        data: dataValues,
        backgroundColor: ["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#A855F7"],
        borderColor: ["#D97706", "#2563EB", "#047857", "#B91C1C", "#9333EA"],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" }, // Removed "as const"
      tooltip: { enabled: true, backgroundColor: "rgba(0,0,0,0.7)", titleColor: "#fff" },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(200, 200, 200, 0.2)" }, ticks: { stepSize: 1 } },
    },
  };
  

  return (
    <div className="w-full md:w-2/3 mx-auto bg-white p-6 rounded-2xl shadow-xl mb-20">
      <h3 className="text-2xl font-extrabold text-gray-800 text-center mb-4">
        😊 Emotion Distribution
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EmotionChart;
