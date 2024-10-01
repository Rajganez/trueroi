import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  LinearScale
);

const BarChart = () => {

  



  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    title: {
      display: "true",
      text: "Static Line Chart",
    },
  };
  const [userData] = useState({
    labels: [2016, 2017, 2018, 2019],
    datasets: [
      {
        label: "Customer List",
        data: [60, 30, 120, 100],
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  });
  return (
    <div>
      <Line data={userData} options={options} />
    </div>
  );
};

export default BarChart;
