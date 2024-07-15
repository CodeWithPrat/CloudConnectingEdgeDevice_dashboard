import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';
import BarChart from './BarChart';

const OeeGauges = () => {
  const [options] = useState({
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        dataLabels: {
          name: {
            fontSize: '18px', // Font size for labels
          },
          value: {
            fontSize: '25px', // Font size for numeric values
          }
        }
      },
    },
  });

  const [series, setSeries] = useState([
    { name: 'Availability', data: 70 },
    { name: 'Performance', data: 70 },
    { name: 'Quality', data: 70 },
    { name: 'OEE', data: 70 },
    { name: 'OEE Loss', data: 70 }
  ]); // Initialize with default values

  useEffect(() => {
    axios.get('https://cmti-edge.online/digitaltwin/spindle.php')
      .then(response => {
        const data = response.data;
        setSeries([
          { name: 'Availability', data: data.speed },
          { name: 'Performance', data: data.voltage },
          { name: 'Quality', data: data.current },
          { name: 'OEE', data: data.torque },
          { name: 'OEE Loss', data: data.temperature }
        ]);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className='w-full'>
      <h1 className='flex justify-center items-center text-4xl font-semibold'>OEE</h1>
      <div id="chart" className='flex w-full justify-center items-center gap-7 py-10'>
        {series.map((item, index) => (
          <div className='w-full' key={index}>
            <h2 className='flex justify-center items-center text-2xl font-medium'>{item.name}</h2>
            <ReactApexChart
              options={{
                ...options,
                labels: [item.name]
              }}
              series={[item.data]}
              type="radialBar"
              height={350}
            />
          </div>
        ))}
      </div>
      <div id="html-dist"></div>
      <div className='w-[1200px]'>
        <BarChart />
      </div>
    </div>
  );
}

export default OeeGauges;
