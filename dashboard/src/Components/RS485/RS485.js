import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const Gauge = ({ title, value, color }) => (
  <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 p-4">
    <div className="bg-white border rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <span className={`text-xl font-bold ${color}`}>{value}</span>
      </div>
      <div className="mt-4">
        <div id={`${title.toLowerCase()}-chart`} className="h-80">
          <ReactApexChart
            options={{
              chart: {
                type: 'radialBar',
                offsetY: -20,
                sparkline: { enabled: true },
              },
              plotOptions: {
                radialBar: {
                  startAngle: -90,
                  endAngle: 90,
                  track: {
                    background: "#e7e7e7",
                    strokeWidth: '97%',
                    margin: 5,
                    dropShadow: {
                      enabled: true,
                      top: 2,
                      left: 0,
                      color: '#999',
                      opacity: 1,
                      blur: 2,
                    },
                  },
                  dataLabels: {
                    name: { show: false },
                    value: { offsetY: -2, fontSize: '22px' },
                  },
                },
              },
              grid: { padding: { top: -10 } },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'light',
                  shadeIntensity: 0.4,
                  inverseColors: false,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 50, 53, 91],
                },
              },
              labels: ['Average Results'],
            }}
            series={[value]}
            type="radialBar"
            width="100%"
          />
        </div>
      </div>
    </div>
  </div>
);

const RS485Chart = ({ parameter, data }) => {
  const chartOptions = {
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
      text: `${parameter} Over Time`,
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
      title: {
        text: parameter
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartOptions} series={[{name: parameter, data: data}]} type="area" height={350} />
      </div>
    </div>
  );
};

const RS485 = () => {
  const [data, setData] = useState({
    voltage: 0,
    current: 0,
    frequency: 0,
    energy: 0,
  });
  const [historicalData, setHistoricalData] = useState({
    voltage: [],
    current: [],
    frequency: [],
    energy: [],
  });
  const [selectedParameter, setSelectedParameter] = useState(null);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://cmti-edge.online/digitaltwin/rs485.php');
      const newData = {
        voltage: response.data.voltage,
        current: response.data.current,
        frequency: response.data.frequency,
        energy: response.data.energy,
      };
      setData(newData);
      
      // Update historical data
      setHistoricalData(prevData => {
        const timestamp = new Date().getTime();
        return {
          voltage: [...prevData.voltage, [timestamp, newData.voltage]],
          current: [...prevData.current, [timestamp, newData.current]],
          frequency: [...prevData.frequency, [timestamp, newData.frequency]],
          energy: [...prevData.energy, [timestamp, newData.energy]],
        };
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleParameterClick = (parameter) => {
    setSelectedParameter(parameter);
  };

  return (
    <div className="container mx-auto px-4 py-8">
         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-blue-600 mb-12">
        RS485
      </h2>
      <div className="flex flex-wrap -mx-4">
        <Gauge title="VOLTAGE (VOLTS)" value={data.voltage} color="text-blue-500" />
        <Gauge title="CURRENT (AMPERE)" value={data.current} color="text-green-500" />
        <Gauge title="FREQUENCY (Hz)" value={data.frequency} color="text-purple-500" />
        <Gauge title="ENERGY (WATT HOUR)" value={data.energy} color="text-red-500" />
      </div>
      <div className="flex justify-center mt-8">
        <button onClick={() => handleParameterClick('VOLTAGE')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mx-2 rounded">
          VOLTAGE
        </button>
        <button onClick={() => handleParameterClick('CURRENT')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mx-2 rounded">
          CURRENT
        </button>
        <button onClick={() => handleParameterClick('FREQUENCY')} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 mx-2 rounded">
          FREQUENCY
        </button>
        <button onClick={() => handleParameterClick('ENERGY')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mx-2 rounded">
          ENERGY
        </button>
      </div>
      {selectedParameter && (
        <div className="mt-8">
          <RS485Chart 
            parameter={selectedParameter} 
            data={historicalData[selectedParameter.toLowerCase()]} 
          />
        </div>
      )}
    </div>
  );
};

export default RS485;
