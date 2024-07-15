import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const FeedDrive = () => {
  const [data, setData] = useState({
    speed: 0,
    torque: 0,
    voltage: 0,
    current: 0,
    power: 0,
    temperature: 0,
  });
  const [graphData, setGraphData] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cmti-edge.online/digitaltwin/feed_drive.php');
        setData(response.data);
        updateGraphData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateGraphData = (newData) => {
    setGraphData(prevData => {
      const updatedData = {...prevData};
      Object.keys(newData).forEach(key => {
        if (!updatedData[key]) updatedData[key] = [];
        updatedData[key].push({x: new Date(), y: Number(newData[key])});
        if (updatedData[key].length > 50) updatedData[key].shift();
      });
      return updatedData;
    });
  };

  const gaugeConfig = [
    { title: "SPEED", value: data.speed, max: 1000, color: "cyan", unit: "RPM" },
    { title: "TORQUE", value: data.torque, max: 100, color: "royalblue", unit: "Nm" },
    { title: "VOLTAGE", value: data.voltage, max: 200, color: "green", unit: "V" },
    { title: "CURRENT", value: data.current, max: 50, color: "orange", unit: "A" },
    { title: "POWER", value: data.power, max: 1000, color: "red", unit: "W" },
    { title: "TEMPERATURE", value: data.temperature, max: 100, color: "purple", unit: "°C" },
  ];

  const renderGauge = (config) => (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2" key={config.title}>
      <Plot
        data={[{
          type: "indicator",
          mode: "gauge+number",
          value: config.value,
          title: { text: config.title, font: { size: 16 } },
          gauge: {
            axis: { range: [null, config.max], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: config.color },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, config.max/2], color: "lightgray" },
              { range: [config.max/2, config.max], color: config.color }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: config.max * 0.9
            }
          },
          number: {
            suffix: ` ${config.unit}`,
            font: { size: 20 }
          }
        }]}
        layout={{
          width: 350,
          height: 250,
          margin: { t: 55, r: 55, l: 20, b: 0 },
          font: { size: 20 }
        }}
        config={{ responsive: true }}
      />
    </div>
  );

  const renderGraph = () => {
    if (!selectedGraph) return null;

    const selectedConfig = gaugeConfig.find(config => config.title === selectedGraph);
    const unit = selectedConfig ? selectedConfig.unit : '';

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2",
      title: { text: `${selectedGraph} (${unit})` },
      axisY: { title: `Value (${unit})`, includeZero: false },
      axisX: { title: "Time", valueFormatString: "HH:mm:ss" },
      data: [{
        type: "line",
        xValueType: "dateTime",
        dataPoints: graphData[selectedGraph.toLowerCase()],
        yValueFormatString: `#,##0.## ${unit}`
      }]
    };

    return (
      <div className="w-full p-4">
        <CanvasJSChart options={options} />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-2 py-4">
         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-blue-600 mb-12">
        FEED DRIVE
      </h2>
      <div className="flex flex-wrap justify-center">
        {gaugeConfig.map(renderGauge)}
      </div>
      <div className="flex flex-wrap justify-center mt-4">
        {gaugeConfig.map(config => (
          <button
            key={config.title}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            onClick={() => setSelectedGraph(config.title)}
          >
            {config.title}
          </button>
        ))}
      </div>
      {renderGraph()}
    </div>
  );
};

export default FeedDrive;