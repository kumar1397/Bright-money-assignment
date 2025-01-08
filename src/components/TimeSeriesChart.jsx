
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import PropTypes from 'prop-types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const TimeSeriesChart = ({ bills }) => {
  const data = {
    labels: bills.map((bill) => bill.date),
    datasets: [
      {
        label: "Monthly Billing",
        data: bills.map((bill) => bill.amount),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};
TimeSeriesChart.propTypes = {
  bills: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TimeSeriesChart;

