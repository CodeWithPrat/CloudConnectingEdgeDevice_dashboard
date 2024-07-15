import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const OeeGauges = () => {
  const [options] = useState({
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        }
      },
    },
    labels: ['Cricket'],
  });

  const [series, setSeries] = useState([70]);

  useEffect(() => {
    axios.get('https://cmti-edge.online/digitaltwin/spindle.php')
      .then(response => {
        const data = response.data;
        setSeries([data.speed, data.voltage, data.current, data.torque, data.temperature]);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className='flex w-full'>
      <div id="chart" className='flex w-full gap-7'>
        <ReactApexChart options={options} series={[series[0]]} type="radialBar" height={350} />
        <ReactApexChart options={options} series={[series[1]]} type="radialBar" height={350} />
        <ReactApexChart options={options} series={[series[2]]} type="radialBar" height={350} />
        <ReactApexChart options={options} series={[series[3]]} type="radialBar" height={350} />
        <ReactApexChart options={options} series={[series[4]]} type="radialBar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default OeeGauges;
