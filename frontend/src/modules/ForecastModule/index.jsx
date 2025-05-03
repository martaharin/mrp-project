// import { useEffect, useState } from 'react';
// import { request } from '@/request';
// import useFetch from '@/hooks/useFetch';
// import ChartTable from './components/ChartTable';

// export default function ForecastModule() {

//   const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
//     request.summary({ entity: 'productionschedule' })
//   );

//  const [alpha, setAlpha] = useState(0.3); // Smoothing factor (0 < alpha < 1)
//   const [weightedMonths, setWeightedMonths] = useState(3);

//   // Weighted Moving Average based steady forecast
//   function calculateWeightedAverage(data, n = 3) {
//     let totalWeight = 0;
//     let weightedSum = 0;

//     for (let i = 0; i < n; i++) {
//       const weight = n - i; // recent months get higher weight
//       const index = data.length - 1 - i;
//       if (index >= 0) {
//         weightedSum += data[index].total * weight;
//         totalWeight += weight;
//       }
//     }

//     return weightedSum / totalWeight;
//   }

//   function forecastSteady(data, monthsToForecast = 12, n = 3) {
//     const forecastValue = calculateWeightedAverage(data, n);

//     // Get last month in the dataset
//     const lastMonth = data[data.length - 1]._id.month;
//     const [lastYear, lastMonthNum] = lastMonth.split('-').map(Number);

//     const forecasts = [];
//     let currentYear = lastYear;
//     let currentMonth = lastMonthNum;

//     for (let i = 0; i < monthsToForecast; i++) {
//       currentMonth++;
//       if (currentMonth > 12) {
//         currentMonth = 1;
//         currentYear++;
//       }

//       const paddedMonth = String(currentMonth).padStart(2, '0');
//       const forecastMonth = `${currentYear}-${paddedMonth}`;

//       forecasts.push({
//         month: forecastMonth,
//         total: Math.round(forecastValue),
//       });
//     }

//     return forecasts;
//   }

//   if (!clientResult) return;
//   const simplifiedData = clientResult.map((item) => ({
//     month: item._id.month,
//     total: item.total,
//   }));
//   const forecast = forecastSteady(clientResult, 12, weightedMonths);
//   console.table(simplifiedData);
//   console.table(forecast);

//   // console.log('Steady Forecast for Next 12 Months:');

//   return (
//     <>
//       <ChartTable data={simplifiedData} forecast={forecast} />
//     </>
//   );
// }

import { useEffect, useState } from 'react';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import ChartTable from './components/ChartTable';
import { PageHeader } from '@ant-design/pro-layout';
import { Layout } from 'antd';

const { Content } = Layout;

export default function ForecastModule() {
  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'productionschedule' })
  );

  const [forecast, setForecast] = useState([]);
  const [weightedMonths, setWeightedMonths] = useState(3);
  const [simplifiedData, setSimplifiedData] = useState([]);

  useEffect(() => {
    if (clientResult) {
      const simplified = clientResult.map((item) => ({
        month: item._id.month,
        total: item.total,
      }));
      setSimplifiedData(simplified);
    }
  }, [clientResult]);
  useEffect(() => {
    if (simplifiedData.length < 1) return;

    setForecast(forecastSteady(simplifiedData, 12, weightedMonths));
  }, [simplifiedData]);

  function calculateWeightedAverage(data, n = 3) {
    let totalWeight = 0;
    let weightedSum = 0;
    for (let i = 0; i < n; i++) {
      const weight = n - i;
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
    console.log(data[data.length - 1]);

    const lastMonth = data[data.length - 1].month;
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
      forecasts.push({ month: `${currentYear}-${paddedMonth}`, total: Math.round(forecastValue) });
    }
    return forecasts;
  }

  // const forecast = forecastSteady(simplifiedData, 12, weightedMonths);

  const handleUpdateTotal = (index, newValue) => {
    const updated = [...simplifiedData];
    updated[index].total = Number(newValue);
    setSimplifiedData(updated);
  };

  return (
    <ContentBox>
      <PageHeader
        // onBack={() => window.history.back()}
        // backIcon={<ArrowLeftOutlined />}
        title={'Forecast'}
        ghost={false}
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>

      <label>
        Weighted Months:&nbsp;
        <input
          readOnly
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={String(weightedMonths)}
          onChange={(e) => {
            const cleaned = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
            setWeightedMonths(cleaned === '' ? '' : Number(cleaned));
          }}
          onBlur={() => {
            if (!isNaN(weightedMonths) && weightedMonths > 0) {
              setForecast(forecastSteady(simplifiedData, 12, weightedMonths));
            }
          }}
        />
        {/* min={1}
            max={simplifiedData.length} */}
      </label>

      {/* <table border="1" cellPadding="5" style={{ marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {simplifiedData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.month}</td>
              <td>
                <input
                  type="number"
                  value={item.total}
                  onChange={(e) => handleUpdateTotal(idx, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <ChartTable data={simplifiedData} forecast={forecast} />
      <ChartTable data={simplifiedData} forecast={forecast} />
    </ContentBox>
  );
}

const ContentBox = ({ children }) => {
  return (
    <Content
      className="whiteBox shadow layoutPadding"
      style={{
        margin: '30px auto',
        width: '100%',
        maxWidth: '100%',
        flex: 'none',
      }}
    >
      {children}
    </Content>
  );
};
