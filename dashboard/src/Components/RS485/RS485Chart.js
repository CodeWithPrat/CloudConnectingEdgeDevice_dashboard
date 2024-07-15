import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const RS485Chart = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: 'XYZ MOTORS',
      data: []  // Initialize with empty data
    }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Stock Price Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: 'Price'
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: function (value) {
            const date = new Date(value);
            return date.toLocaleTimeString('en-US', { hour12: false });
          },
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          }
        }
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cmti-edge.online/digitaltwin/rs485.php');  // Replace with your API endpoint
        const newData = response.data.map(item => ({
          x: new Date(item.timestamp).getTime(),
          y: item.value
        }));

        setChartData({
          series: [{
            name: 'XYZ MOTORS',
            data: newData
          }],
          options: chartData.options  // Keep the existing options
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Fetch data continuously at intervals (e.g., every 5 seconds)
    const interval = setInterval(fetchData, 5000);  // Adjust interval as needed

    return () => clearInterval(interval);  // Clean up interval on component unmount
  }, []);  // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default RS485Chart;
