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

const EmotionChart = ({ emotionData }) => {
  if (!emotionData || Object.keys(emotionData).length === 0) return null;

  const labels = Object.keys(emotionData);
  const values = Object.values(emotionData) as number[];
  const total = values.reduce((sum, val) => sum + val, 0);
  const percentageValues = values.map((val) => ((val / total) * 100).toFixed(2));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Emotion %",
        data: percentageValues,
        backgroundColor: [
          "#fcd34d",
          "#a5b4fc",
          "#6ee7b7",
          "#fdba74",
          "#c4b5fd",
          "#fda4af",
        ],
        borderColor: [
          "#fbbf24",
          "#818cf8",
          "#34d399",
          "#fb923c",
          "#a78bfa",
          "#fb7185",
        ],
        borderWidth: 2,
        borderRadius: 12,
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
        position: "top",
        labels: {
          color: "#4B5563",
          font: {
            size: 14,
            weight: "bold",
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
        ticks: {
          color: "#6B7280",
          font: { size: 13 },
        },
      },
      y: {
        grid: {
          color: "rgba(209, 213, 219, 0.2)",
          borderDash: [3, 3],
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          color: "#6B7280",
          font: { size: 13 },
          callback: (val) => `${val}%`,
        },
        max: 100,
      },
    },
  } as const;

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-xl mb-20">
      <h3 className="text-2xl font-extrabold text-gray-800 text-center mb-4">
        😊 Emotion Distribution (%)
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EmotionChart;
