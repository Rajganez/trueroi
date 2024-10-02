import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(CategoryScale, BarElement, Tooltip, Legend, LinearScale);

const BarChart = ({ contact, sentMail, UnsubscribedMail, Testimonial }) => {
  const [userData, setUserData] = useState({
    labels: ["Total List", "Total Mail Sent", "Unsubscribed"],
    datasets: [
      {
        label: "List and Email Campaign",
        data: [0, 0, 0], // Initial dummy data
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    title: {
      display: true,
      text: "Static Bar Chart",
    },
  };

  // Update the chart data when the props change
  useEffect(() => {
    setUserData({
      labels: [
        "Total List",
        "Total Mail Sent",
        "Unsubscribed",
        "Testimonial Received",
      ],
      datasets: [
        {
          label: "Contact List and Email Campaign",
          data: [contact, sentMail, UnsubscribedMail, Testimonial], // Update the data
          backgroundColor: [
            "rgba(75,192,192,0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: [
            "rgba(75,192,192,1)",
            "rgba(255, 159, 64)",
            "rgba(153, 102, 255)",
            "rgba(255, 99, 132)",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [contact, sentMail, UnsubscribedMail, Testimonial]);

  return (
    <div>
      <Bar data={userData} options={options} />
    </div>
  );
};

export default BarChart;

BarChart.propTypes = {
  contact: PropTypes.number.isRequired,
  sentMail: PropTypes.number.isRequired,
  UnsubscribedMail: PropTypes.number.isRequired,
  Testimonial: PropTypes.number.isRequired,
};
