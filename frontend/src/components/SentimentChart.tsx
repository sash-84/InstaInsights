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
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const SentimentChart = ({ sentimentData }) => {
  if (!sentimentData) return null;

  const labels = ["Positive 😊", "Neutral 😐", "Negative 😞"];
  const values = [
    sentimentData.Positive || 0,
    sentimentData.Neutral || 0,
    sentimentData.Negative || 0,
  ];

  const total = values.reduce((sum, val) => sum + val, 0);
  const percentageValues = values.map((val) => ((val / total) * 100).toFixed(2));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sentiment %",
        data: percentageValues,
        backgroundColor: ["#6ee7b7", "#fde68a", "#fca5a5"],
        borderColor: ["#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 2,
        borderRadius: 10,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: "easeOutBounce",
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          color: "#4B5563",
          font: {
            size: 14,
            weight: "bold" as const,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`,
        },
        backgroundColor: "#1f2937",
        titleColor: "#fbbf24",
        bodyColor: "#fff",
        cornerRadius: 6,
        padding: 10,
      },
      datalabels: {
        color: "#374151",
        font: {
          weight: "bold",
        },
        formatter: (value) => `${value}%`,
        anchor: "end",
        align: "top",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280", font: { size: 13 } },
      },
      y: {
        grid: {
          color: "rgba(209, 213, 219, 0.2)",
          borderDash: [3, 3],
        },
        ticks: {
          beginAtZero: true,
          color: "#6B7280",
          stepSize: 10,
          font: { size: 13 },
          callback: (val) => `${val}%`,
        },
        max: 100,
      },
    },
  } as const;

  return (
    <div className="w-full mx-auto bg-gradient-to-r from-white via-gray-100 to-white p-6 rounded-2xl shadow-xl mb-20">
      <h3 className="text-2xl font-extrabold text-gray-800 text-center mb-4">
        📊 Sentiment Distribution (%)
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SentimentChart;
