// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import PropTypes from 'prop-types';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const formatMonth = (monthStr) => {
//   const [year, month] = monthStr.split('-');
//   const date = new Date(year, parseInt(month) - 1);
//   return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
// };

// const ChartTable = ({ data, forecast }) => {
//   const combined = [...data, ...forecast];
//   const labels = combined.map((item) => formatMonth(item.month));
//   const totalValues = combined.map((item) => item.total);

//   // Mark forecast bars with a different color
//   const actualLength = data.length;
//   const backgroundColors = combined.map((_, index) =>
//     index < actualLength ? 'rgba(54, 162, 235, 0.7)' : 'rgba(255, 99, 132, 0.7)'
//   );

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: 'Production',
//         data: totalValues,
//         backgroundColor: backgroundColors,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Month',
//         },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 45,
//           autoSkip: false, // Show all labels
//         },
//         grid: {
//           display: false, // No grid lines on X-axis
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Quantity',
//         },
//         grid: {
//           display: false, // No grid lines on Y-axis
//         },
//       },
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: 'Monthly Production with Forecast',
//         font: {
//           size: 18,
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const index = context.dataIndex;
//             const value = context.parsed.y;
//             const type = index < data.length ? 'Actual' : 'Forecast';
//             return `${type}: ${value}`;
//           },
//         },
//       },
//       legend: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <div style={{ height: '500px' }}>
//       <Bar data={chartData} options={chartOptions} />
//     </div>
//   );
// };

// ChartTable.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       month: PropTypes.string.isRequired,
//       total: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   forecast: PropTypes.arrayOf(
//     PropTypes.shape({
//       month: PropTypes.string.isRequired,
//       total: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

// export default ChartTable;

// import React, { useRef, useEffect } from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export default function ChartTable({ data, forecast }) {
//   const chartRef = useRef();

//   // Combine both the data and forecast for the x-axis labels
//   const combined = [...data, ...forecast];

//   // Format month labels to "Jan 25"
//   const formatMonth = (monthString) => {
//     const [year, month] = monthString.split('-');
//     const date = new Date(`${year}-${month}-01`);
//     return new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(date);
//   };

//   const labels = combined.map((item) => formatMonth(item.month));
//   const actualData = data.map((item) => item.total);
//   const forecastData = [
//     ...new Array(data.length).fill(null), // Offset forecast to align with future months
//     ...forecast.map((item) => item.total),
//   ];

//   const systemFont = getComputedStyle(document.body).fontFamily;

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Month',
//           color: 'black',
//           font: {
//             family: systemFont,
//             weight: 'bold',
//           },
//         },
//         ticks: {
//           color: 'black',
//           maxRotation: 45,
//           minRotation: 45,
//           autoSkip: false,
//           font: {
//             family: systemFont,
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Quantity',
//           color: 'black',
//           font: {
//             family: systemFont,
//             weight: 'bold',
//           },
//         },
//         ticks: {
//           color: 'black',
//           font: {
//             family: systemFont,
//           },
//         },
//         grid: {
//           display: false,
//         },
//       },
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: 'Monthly Production with Forecast',
//         color: 'black',
//         font: {
//           size: 18,
//           family: systemFont,
//           weight: 'bold',
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const index = context.dataIndex;
//             const value = context.parsed.y;
//             const type = index < data.length ? 'Actual' : 'Forecast';
//             return `${type}: ${value}`;
//           },
//         },
//       },
//       legend: {
//         display: false,
//       },
//     },
//     elements: {
//       bar: {
//         borderWidth: 1,
//         borderRadius: 4,
//       },
//     },
//     // Remove gap between bars by adjusting dataset options
//     datasets: {
//       bar: {
//         barPercentage: 1.0, // Bar width in category
//         categoryPercentage: 0.9, // Control bar grouping
//       },
//     },
//   };

//   // Chart Data with Actual and Forecast datasets
//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: 'Actual',
//         data: actualData,
//         backgroundColor: 'rgba(54, 162, 235, 0.7)',
//         borderRadius: 4,
//         // Adjust the bar width within the category
//         barPercentage: 0.45, // Actual bars take up half the space
//       },
//       {
//         label: 'Forecast',
//         data: forecastData,
//         backgroundColor: 'rgba(255, 159, 64, 0.6)',
//         borderRadius: 4,
//         // Adjust the bar width within the category, matching Actual
//         barPercentage: 0.45, // Forecast bars take up half the space
//       },
//     ],
//   };

//   return (
//     <div style={{ height: '400px', width: '100%' }}>
//       <Bar ref={chartRef} data={chartData} options={chartOptions} />
//     </div>
//   );
// }

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const formatMonth = (monthStr) => {
  const [year, month] = monthStr.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: '2-digit' }).format(date);
};

const ChartTable = ({ data, forecast }) => {
  const combined = [...data, ...forecast];
  const labels = combined.map((item) => formatMonth(item.month));
  const totalValues = combined.map((item) => item.total);

  // Mark forecast bars with a different color
  const actualLength = data.length;
  const backgroundColors = combined.map((_, index) =>
    index < actualLength ? 'rgba(54, 162, 235, 0.7)' : 'rgba(255, 159, 64, 0.6)'
  );

  // Chart data
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Production',
        data: totalValues,
        backgroundColor: backgroundColors,
        barPercentage: 0.45, // Adjusting bar width
      },
    ],
  };

  const systemFont = getComputedStyle(document.body).fontFamily;

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          color: 'black',
          font: {
            family: systemFont,
            weight: 'bold',
          },
        },
        ticks: {
          color: 'black',
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false,
          font: {
            family: systemFont,
          },
        },
        grid: {
          display: false, // No grid lines on X-axis
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity',
          color: 'black',
          font: {
            family: systemFont,
            weight: 'bold',
          },
        },
        ticks: {
          color: 'black',
          font: {
            family: systemFont,
          },
        },
        grid: {
          display: false, // No grid lines on Y-axis
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Production with Forecast',
        color: 'black',
        font: {
          size: 18,
          family: systemFont,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const value = context.parsed.y;
            const type = index < data.length ? 'Actual' : 'Forecast';
            return `${type}: ${value}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    // Ensure bars are aligned tightly without gap
    datasets: {
      bar: {
        barPercentage: 1.0, // No gap between bars
        categoryPercentage: 0.9,
      },
    },
  };

  return (
    <div style={{ height: '500px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

ChartTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ChartTable;
