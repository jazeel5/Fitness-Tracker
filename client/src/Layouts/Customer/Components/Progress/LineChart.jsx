import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function LineChart({ label, hData, option }) {
  const height = {
    labels: hData.map((record) => record.month),
    datasets: [
      {
        label: label,
        data: hData.map((record) => record.height),
        fill: false,
        borderColor: "#ff000036",
        tension: 0.1,
      },
    ],
  };
  const weight = {
    labels: hData.map((record) => record.date),
    datasets: [
      {
        label: label,
        data: hData.map((record) => record.weight),
        fill: false,
        borderColor: "#ff000036",
        tension: 0.1,
      },
    ],
  };
  const filter = option == "Height" ? height : weight;
  return (
    <div>
      <h2>{option} Records</h2>
      <Line data={filter} />
    </div>
  );
}
