import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2"; // Assuming you are using react-chartjs-2 for React integration
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart from chart.js/auto

const BarChart = () => {
  const [spindleOverride, setSpindleOverride] = useState([]);
  const [feedOverride, setFeedOverride] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [labels, setLabels] = useState([]);
  const chartRef = useRef(null); // Reference to store the chart instance

  // Function to get current month and date dynamically
  const getCurrentMonthAndDate = () => {
    const date = new Date();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  // Fetch data from API on component mount
  useEffect(() => {
    axios.get('https://cmti-edge.online/digitaltwin/oee.php')
      .then(response => {
        const data = response.data;
        setSpindleOverride([data.avai]);
        setFeedOverride([data.performance]);
        setTemperature([data.quality]);
        setLabels([getCurrentMonthAndDate()]);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Render chart when data or options change
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
        const newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: spindleOverride,
                backgroundColor: "rgba(32, 71, 230, 0.8)",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 1,
                data: spindleOverride
              },
              {
                label: feedOverride,
                backgroundColor: "rgba(110, 12, 196, 0.8)",
                borderColor: "rgb(54, 162, 235)",
                borderWidth: 1,
                data: feedOverride
              },
              {
                label: temperature,
                backgroundColor: "rgba(195, 25, 16, 0.8)",
                borderColor: "rgb(255, 206, 86)",
                borderWidth: 1,
                data: temperature
              }
            ]
          },
          options: {
            plugins: {
              datalabels: {
                color: "black",
                labels: {
                  title: {
                    font: {
                      weight: "bold"
                    }
                  }
                },
                anchor: "end",
                align: "-90"
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        chartRef.current.chart = newChartInstance;
      }
    }
  }, [spindleOverride, feedOverride, temperature, labels]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
