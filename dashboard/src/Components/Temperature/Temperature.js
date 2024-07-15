import axios from "axios";
import React, { useEffect, useState } from "react";
import Thermometer from "react-thermometer-component";
import TempChart from "./TempChart";

const Temperature = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedSensor, setSelectedSensor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://cmti-edge.online/digitaltwin/modbus_tcp.php"
        );
        if (response.status === 200) {
          setChartData(response.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSensorClick = (sensor) => {
    setSelectedSensor(sensor);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-blue-600 mb-8">
        MODBUS TCP/IP Temperature Monitoring
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[1, 2, 3].map((sensorNum) => (
          <div key={sensorNum} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Sensor {sensorNum}</h3>
            <div className="w-48 h-64 mb-4">
              <Thermometer
                theme="light"
                value={chartData?.[`temp${sensorNum}`] / 1}
                max={200}
                size="large"
                height={250}
                steps={5}
                reverseGradient={true}
              />
            </div>
            <p className="text-2xl font-bold text-blue-500">
              {chartData?.[`temp${sensorNum}`]}°C
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {[1, 2, 3].map((sensorNum) => (
          <button
            key={sensorNum}
            className={`py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out ${
              selectedSensor === `temp${sensorNum}`
                ? "bg-blue-800 text-white shadow-lg transform scale-105"
                : "bg-blue-950 text-white hover:bg-blue-100"
            }`}
            onClick={() => handleSensorClick(`temp${sensorNum}`)}
          >
            Temperature Sensor {sensorNum.toString().padStart(2, '0')}
          </button>
        ))}
      </div>

      {selectedSensor && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TempChart selectedSensor={selectedSensor} />
        </div>
      )}
    </div>
  );
};

export default Temperature;