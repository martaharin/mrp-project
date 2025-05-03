// import CrudModule from '@/modules/CrudModule/CrudModule';
// import DynamicForm from '@/forms/DynamicForm';
// import { fields } from './config';

// import useLanguage from '@/locale/useLanguage';

// export default function Customer() {
//   const translate = useLanguage();
//   const entity = 'client';
//   const searchConfig = {
//     displayLabels: ['name'],
//     searchFields: 'name',
//   };
//   const deleteModalLabels = ['name'];

//   const Labels = {
//     PANEL_TITLE: translate('client'),
//     DATATABLE_TITLE: translate('client_list'),
//     ADD_NEW_ENTITY: translate('add_new_client'),
//     ENTITY_NAME: translate('client'),
//   };
//   const configPage = {
//     entity,
//     ...Labels,
//   };
//   const config = {
//     ...configPage,
//     fields,
//     searchConfig,
//     deleteModalLabels,
//   };
//   return (
//     <CrudModule
//       createForm={<DynamicForm fields={fields} />}
//       updateForm={<DynamicForm fields={fields} />}
//       config={config}
//     />
//   );
// }

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useState } from 'react';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function Customer() {
//   const [forecast, setForecast] = useState([12000, 15000, 18000, 20000, 22000, 25000]);
//   const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

//   const handleChange = (e, index) => {
//     const newValue = e.target.value;
//     setForecast((prev) => prev.map((val, idx) => (idx === index ? Number(newValue) : val)));
//   };

//   const forecastData = {
//     labels,
//     datasets: [
//       {
//         label: 'Projected Sales',
//         data: forecast,
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//         fill: true,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Sales ($)',
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Month',
//         },
//       },
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: 'Sales Forecast',
//         font: {
//           size: 20,
//         },
//       },
//       legend: {
//         position: 'top',
//       },
//     },
//   };

//   return (
//     <>
//       <h3>Monthly Sales Trend</h3>
//       <Line data={forecastData} options={chartOptions} />

//       <h3>Edit Sales Data</h3>
//       <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>Month</th>
//             <th>Projected Sales</th>
//           </tr>
//         </thead>
//         <tbody>
//           {labels.map((month, index) => (
//             <tr key={month}>
//               <td>{month}</td>
//               <td>
//                 <input
//                   type="number"
//                   value={forecast[index]}
//                   onChange={(e) => handleChange(e, index)} // 🛠️ Fixed here: removed 'projected'
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useState } from 'react';
// import * as XLSX from 'xlsx';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function ForecastPage() {
//   const [forecast, setForecast] = useState([]);
//   const [labels, setLabels] = useState([]);
//   const [forecastMonths, setForecastMonths] = useState(3); // How many future months to forecast

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = evt.target.result;
//       const workbook = XLSX.read(data, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       processExcelData(jsonData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const processExcelData = (data) => {
//     const monthlyData = {};

//     data.forEach((row) => {
//       if (row['Status'] !== 'Completed') return;

//       const date = new Date(row['Production Date']);
//       const month = date.toLocaleString('default', { month: 'short' });
//       const year = date.getFullYear();
//       const monthYear = `${month} ${year}`;

//       const quantity = Number(row['Quantity']) || 0;

//       if (monthlyData[monthYear]) {
//         monthlyData[monthYear] += quantity;
//       } else {
//         monthlyData[monthYear] = quantity;
//       }
//     });

//     const monthOrder = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ];

//     const sortedLabels = Object.keys(monthlyData).sort((a, b) => {
//       const [monthA, yearA] = a.split(' ');
//       const [monthB, yearB] = b.split(' ');

//       if (yearA !== yearB) {
//         return yearA - yearB;
//       }
//       return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
//     });

//     const sortedQuantities = sortedLabels.map((key) => monthlyData[key]);

//     // Forecast future data
//     const { futureLabels, futureData } = generateForecast(sortedLabels, sortedQuantities);

//     setLabels([...sortedLabels, ...futureLabels]);
//     setForecast([...sortedQuantities, ...futureData]);
//   };

//   const generateForecast = (existingLabels, existingData) => {
//     const futureLabels = [];
//     const futureData = [];

//     const monthOrder = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ];

//     let [lastMonthName, lastYear] = existingLabels[existingLabels.length - 1].split(' ');
//     let monthIndex = monthOrder.indexOf(lastMonthName);
//     lastYear = parseInt(lastYear);

//     for (let i = 0; i < forecastMonths; i++) {
//       // Move to next month
//       monthIndex++;
//       if (monthIndex >= 12) {
//         monthIndex = 0;
//         lastYear += 1;
//       }

//       const newLabel = `${monthOrder[monthIndex]} ${lastYear}`;
//       futureLabels.push(newLabel);

//       // Forecast formula: Average of last 3 months
//       const lastThreeData = existingData.slice(-3);
//       const average = lastThreeData.reduce((sum, val) => sum + val, 0) / lastThreeData.length || 0;
//       const roundedAverage = Math.round(average);

//       futureData.push(roundedAverage);
//       existingData.push(roundedAverage); // Important: So next forecast uses updated data
//     }

//     return { futureLabels, futureData };
//   };

//   const handleChange = (e, index) => {
//     const newValue = e.target.value;
//     setForecast((prev) => prev.map((val, idx) => (idx === index ? Number(newValue) : val)));
//   };

//   const forecastData = {
//     labels,
//     datasets: [
//       {
//         label: 'Completed Production Quantity (with Forecast)',
//         data: forecast,
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//         fill: true,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Quantity',
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Month Year',
//         },
//       },
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: 'Monthly Completed Production Forecast (Including Future Months)',
//         font: {
//           size: 20,
//         },
//       },
//       legend: {
//         position: 'top',
//       },
//     },
//   };

//   return (
//     <>
//       <h2>Forecast Page (Completed Only, Grouped by Year)</h2>

//       {/* Upload Excel */}
//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={handleFileUpload}
//         style={{ marginBottom: '20px' }}
//       />

//       {/* Chart */}
//       {forecast.length > 0 && (
//         <>
//           <h3>Monthly Completed Production (Including Forecast)</h3>
//           <Line data={forecastData} options={chartOptions} />
//         </>
//       )}

//       {/* Editable Table */}
//       {forecast.length > 0 && (
//         <>
//           <h3>Edit Production Data (Actual + Forecast)</h3>
//           <table
//             border="1"
//             cellPadding="8"
//             style={{ borderCollapse: 'collapse', marginTop: '20px' }}
//           >
//             <thead>
//               <tr>
//                 <th>Month Year</th>
//                 <th>Completed / Forecasted Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {labels.map((monthYear, index) => (
//                 <tr key={monthYear}>
//                   <td>{monthYear}</td>
//                   <td>
//                     <input
//                       type="number"
//                       value={forecast[index]}
//                       onChange={(e) => handleChange(e, index)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </>
//   );
// }

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useState } from 'react';
// import * as XLSX from 'xlsx';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// export default function ForecastPage() {
//   const [forecast, setForecast] = useState([]);
//   const [actualData, setActualData] = useState([]);
//   const [labels, setLabels] = useState([]);
//   const [forecastMonths, setForecastMonths] = useState(3);
//   const [alpha, setAlpha] = useState(0.3); // Smoothing factor (0 < alpha < 1)

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const data = evt.target.result;
//       const workbook = XLSX.read(data, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       processExcelData(jsonData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const processExcelData = (data) => {
//     const monthlyData = {};

//     data.forEach((row) => {
//       if (row['Status'] !== 'Completed') return;

//       const date = new Date(row['Production Date']);
//       const month = date.toLocaleString('default', { month: 'short' });
//       const year = date.getFullYear();
//       const monthYear = `${month} ${year}`;

//       const quantity = Number(row['Quantity']) || 0;

//       if (monthlyData[monthYear]) {
//         monthlyData[monthYear] += quantity;
//       } else {
//         monthlyData[monthYear] = quantity;
//       }
//     });

//     const monthOrder = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ];

//     const sortedLabels = Object.keys(monthlyData).sort((a, b) => {
//       const [monthA, yearA] = a.split(' ');
//       const [monthB, yearB] = b.split(' ');

//       if (yearA !== yearB) {
//         return yearA - yearB;
//       }
//       return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
//     });

//     const sortedQuantities = sortedLabels.map((key) => monthlyData[key]);
//     setActualData(sortedQuantities);

//     // Forecast future data using exponential smoothing
//     const { futureLabels, futureData } = generateExponentialSmoothingForecast(
//       sortedLabels,
//       sortedQuantities
//     );

//     setLabels([...sortedLabels, ...futureLabels]);
//     setForecast([...sortedQuantities, ...futureData]);
//   };

//   const generateExponentialSmoothingForecast = (existingLabels, existingData) => {
//     const futureLabels = [];
//     const futureData = [];

//     const monthOrder = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ];

//     let [lastMonthName, lastYear] = existingLabels[existingLabels.length - 1].split(' ');
//     let monthIndex = monthOrder.indexOf(lastMonthName);
//     lastYear = parseInt(lastYear);

//     // Initialize level (l) and trend (b)
//     let l = existingData[0]; // first data point
//     let b = existingData[1] - existingData[0]; // initial trend estimate (basic diff)

//     const beta = 0.3; // You can make this a state if you want it user-adjustable like alpha

//     // Apply Holt's smoothing to historical data
//     for (let t = 1; t < existingData.length; t++) {
//       const previousLevel = l;
//       l = alpha * existingData[t] + (1 - alpha) * (l + b);
//       b = beta * (l - previousLevel) + (1 - beta) * b;
//     }

//     // Generate future forecasts
//     for (let i = 1; i <= forecastMonths; i++) {
//       // Move to next month
//       monthIndex++;
//       if (monthIndex >= 12) {
//         monthIndex = 0;
//         lastYear += 1;
//       }

//       const newLabel = `${monthOrder[monthIndex]} ${lastYear}`;
//       futureLabels.push(newLabel);

//       const forecastValue = l + i * b;
//       futureData.push(Math.round(forecastValue));
//     }

//     return { futureLabels, futureData };
//   };

//   const handleAlphaChange = (e) => {
//     const newAlpha = parseFloat(e.target.value);
//     if (newAlpha > 0 && newAlpha < 1) {
//       setAlpha(newAlpha);
//       if (actualData.length > 0) {
//         // Recalculate forecast when alpha changes
//         const { futureLabels, futureData } = generateExponentialSmoothingForecast(
//           labels.slice(0, actualData.length),
//           actualData
//         );
//         setLabels([...labels.slice(0, actualData.length), ...futureLabels]);
//         setForecast([...actualData, ...futureData]);
//       }
//     }
//   };

//   const handleForecastMonthsChange = (e) => {
//     const months = parseInt(e.target.value);
//     setForecastMonths(months);
//     if (actualData.length > 0) {
//       // Recalculate forecast when months change
//       const { futureLabels, futureData } = generateExponentialSmoothingForecast(
//         labels.slice(0, actualData.length),
//         actualData
//       );
//       setLabels([...labels.slice(0, actualData.length), ...futureLabels]);
//       setForecast([...actualData, ...futureData]);
//     }
//   };

//   const forecastData = {
//     labels,
//     datasets: [
//       {
//         label: 'Actual Production',
//         data: actualData,
//         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 2,
//         fill: false,
//       },
//       {
//         label: 'Forecast',
//         data: [...Array(actualData.length).fill(null), ...forecast.slice(actualData.length)],
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 2,
//         borderDash: [5, 5],
//         fill: false,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: 'Quantity',
//         },
//       },
//       x: {
//         title: {
//           display: true,
//           text: 'Month Year',
//         },
//       },
//     },
//     plugins: {
//       title: {
//         display: true,
//         text: 'Monthly Production with Exponential Smoothing Forecast',
//         font: {
//           size: 20,
//         },
//       },
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || '';
//             if (label) {
//               label += ': ';
//             }
//             if (context.parsed.y !== null) {
//               label += context.parsed.y;
//               if (context.datasetIndex === 1) {
//                 // Forecast dataset
//                 label += ' (forecast)';
//               }
//             }
//             return label;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <>
//       <h2>Production Forecast with Exponential Smoothing</h2>

//       {/* Controls */}
//       <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
//         <div>
//           <label htmlFor="alpha">Smoothing Factor (α): </label>
//           <input
//             id="alpha"
//             type="number"
//             min="0.01"
//             max="0.99"
//             step="0.01"
//             value={alpha}
//             onChange={handleAlphaChange}
//             style={{ width: '60px' }}
//           />
//           <div style={{ fontSize: '0.8em', color: '#666' }}>
//             Higher α (0.5-0.9) = more responsive to recent changes
//             <br />
//             Lower α (0.1-0.4) = smoother forecast
//           </div>
//         </div>

//         <div>
//           <label htmlFor="forecastMonths">Months to Forecast: </label>
//           <input
//             id="forecastMonths"
//             type="number"
//             min="1"
//             max="24"
//             value={forecastMonths}
//             onChange={handleForecastMonthsChange}
//             style={{ width: '60px' }}
//           />
//         </div>
//       </div>

//       {/* Upload Excel */}
//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={handleFileUpload}
//         style={{ marginBottom: '20px' }}
//       />

//       {/* Chart */}
//       {forecast.length > 0 && (
//         <>
//           <Line data={forecastData} options={chartOptions} />

//           {/* Forecast Summary */}
//           <div
//             style={{
//               marginTop: '20px',
//               padding: '15px',
//               background: '#f5f5f5',
//               borderRadius: '5px',
//             }}
//           >
//             <h3>Forecast Summary</h3>
//             <p>Using exponential smoothing with α = {alpha}</p>
//             <p>Forecast period: {forecastMonths} month(s)</p>

//             <h4>Next {forecastMonths} Month(s) Forecast:</h4>
//             <ul>
//               {labels.slice(-forecastMonths).map((month, index) => (
//                 <li key={month}>
//                   {month}: {Math.round(forecast[actualData.length + index])}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

import { useState } from 'react';
import ChartTable from '@/modules/ForecastModule/components/ChartTable';
import ForecastModule from '@/modules/ForecastModule';

export default function ForecastPage() {
  const [alpha, setAlpha] = useState(0.3); // Smoothing factor (0 < alpha < 1)
  const [forecastMonths, setForecastMonths] = useState(3);

  const originalData = [
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2024-05' }, total: 150 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2024-06' }, total: 180 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2024-07' }, total: 210 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2024-08' }, total: 240 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2024-09' }, total: 200 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2024-10' }, total: 220 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2024-11' }, total: 250 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2024-12' }, total: 270 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2025-01' }, total: 240 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2025-02' }, total: 230 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2025-03' }, total: 220 },
    { _id: { bom: '680e229552b4935757de2e03', status: 'finished', month: '2025-04' }, total: 250 },
  ];

  // Weighted Moving Average based steady forecast
  function calculateWeightedAverage(data, n = 3) {
    let totalWeight = 0;
    let weightedSum = 0;

    for (let i = 0; i < n; i++) {
      const weight = n - i; // recent months get higher weight
      const index = data.length - 1 - i;
      if (index >= 0) {
        weightedSum += data[index].total * weight;
        totalWeight += weight;
      }
    }

    return weightedSum / totalWeight;
  }

  function forecastSteady(data, monthsToForecast = 12, n = 3) {
    const forecastValue = calculateWeightedAverage(data, n);

    // Get last month in the dataset
    const lastMonth = data[data.length - 1]._id.month;
    const [lastYear, lastMonthNum] = lastMonth.split('-').map(Number);

    const forecasts = [];
    let currentYear = lastYear;
    let currentMonth = lastMonthNum;

    for (let i = 0; i < monthsToForecast; i++) {
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }

      const paddedMonth = String(currentMonth).padStart(2, '0');
      const forecastMonth = `${currentYear}-${paddedMonth}`;

      forecasts.push({
        month: forecastMonth,
        total: Math.round(forecastValue),
      });
    }

    return forecasts;
  }

  // Run forecast
  const forecast = forecastSteady(originalData, 12, 3);

  // Output forecast
  console.log('Steady Forecast for Next 12 Months:');
  console.table(forecast);

  const data = [
    { month: '2024-05', total: 150 },
    { month: '2024-06', total: 180 },
    { month: '2024-07', total: 210 },
    { month: '2024-08', total: 240 },
    { month: '2024-09', total: 200 },
    { month: '2024-10', total: 220 },
    { month: '2024-11', total: 250 },
    { month: '2024-12', total: 270 },
    { month: '2025-01', total: 240 },
    { month: '2025-02', total: 230 },
    { month: '2025-03', total: 220 },
    { month: '2025-04', total: 250 },
  ];

  return (
    <div>
      <h2>Production Forecast with Exponential Smoothing</h2>

      {/* Controls */}
      {/* <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <div>
          <label htmlFor="alpha">Smoothing Factor (α): </label>
          <input
            id="alpha"
            type="number"
            min="0.01"
            max="0.99"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            style={{ width: '60px' }}
          />
        </div>

        <div>
          <label htmlFor="forecastMonths">Months to Forecast: </label>
          <input
            id="forecastMonths"
            type="number"
            min="1"
            max="24"
            value={forecastMonths}
            onChange={(e) => setForecastMonths(parseInt(e.target.value))}
            style={{ width: '60px' }}
          />
        </div>
      </div> */}

      {/* Chart */}
      {/* <ChartTable data={data} forecast={forecast} forecastMonths={forecastMonths} alpha={alpha} />
      <ChartTable data={data} forecast={forecast} forecastMonths={forecastMonths} alpha={alpha} /> */}
      <ForecastModule />
    </div>
  );
}
