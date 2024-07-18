import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
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
    { name: 'Availability', data: 0 },
    { name: 'Performance', data: 0 },
    { name: 'Quality', data: 0 },
    { name: 'OEE', data: 0 },
    { name: 'OEE Loss', data: 0 }
  ]); // Initialize with default values

  useEffect(() => {
    axios.get('https://cmti-edge.online/digitaltwin/oee.php')
      .then(response => {
        const data = response.data;

        // Calculate OEE Loss
        const OEE = parseFloat(data.OEE);
        const avai = parseFloat(data.avai);
        const performance = parseFloat(data.performance);
        const quality = parseFloat(data.quality);

        const totalOEE = avai * performance * quality / 10000;
        const OEELoss = totalOEE - OEE;

        setSeries([
          { name: 'Availability', data: avai },
          { name: 'Performance', data: performance },
          { name: 'Quality', data: quality },
          { name: 'OEE', data: OEE },
          { name: 'OEE Loss', data: OEELoss.toFixed(2) } // Round to 2 decimal places
        ]);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className='w-full'>
      <h1 className='flex justify-center items-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold'>OEE</h1>
      <div className="melt_back  lg:w-1/2">
        <Breadcrumb />
      </div>
      <div id="chart" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-7 lg:gap-10 py-6 sm:py-8 md:py-10 lg:py-12'>
        {series.map((item, index) => (
          <div className='w-full' key={index}>
            <h2 className='flex justify-center items-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium'>{item.name}</h2>
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
      <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 md:gap-10 lg:gap-20'>
        <h1 className='text-lg sm:text-xl md:text-2xl'>Part Count: <span className='pl-2 sm:pl-4'> 13</span></h1>
        <h2 className='flex text-lg sm:text-xl md:text-2xl'>Shift Status:</h2>
      </div>
      <div className='w-full sm:w-10/12 md:w-8/12 lg:w-8/12 xl:w-6/12 pl-2 sm:pl-2 md:pl-6 lg:pl-7 mt-4'>
        <BarChart />
      </div>
    </div>
  );
}

export default OeeGauges;
