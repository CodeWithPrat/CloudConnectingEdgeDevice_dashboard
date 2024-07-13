import React, { useEffect, useState } from 'react';
import cmtilogo from '../../Images/CCED_imgs/cmtiLogo.jpeg'; // Adjust the import to your logo image path

const Supervisor = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Header */}
     <div className="w-full flex flex-col md:flex-row items-center justify-between bg-white shadow-md py-4 px-8">
        <img src={cmtilogo} alt="Company Logo" className="h-20 md:h-36 mr-4 mb-4 md:mb-0" />
        <h1 className="text-2xl md:text-5xl font-bold text-sky-700 mb-4 md:mb-0" style={{ fontFamily: 'serif' }}>
          Cloud Connecting EDGE Device
        </h1>
        <div className="text-right font-bold">
          <p className="text-base md:text-xl">{currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-sm md:text-lg">{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-800" style={{ fontFamily: 'serif' }}>Supervisors Monitoring and Cloud Interface</h2>
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl ">
          <div className="flex flex-wrap justify-between mb-4 ">
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4 md:mb-0">
              <label htmlFor="job" className="block text-lg font-medium mb-2">Assign a Job for Today</label>
              <input
                type="text"
                id="job"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4 md:mb-0">
              <label htmlFor="shifts" className="block text-lg font-medium mb-2">Number of Shifts</label>
              <input
                type="number"
                id="shifts"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4 md:mb-0">
              <label htmlFor="timePerPart" className="block text-lg font-medium mb-2">Optimum Time for Each Part</label>
              <input
                type="text"
                id="timePerPart"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4 md:mb-0">
              <label htmlFor="targetParts" className="block text-lg font-medium mb-2">Estimated Target Parts</label>
              <input
                type="number"
                id="targetParts"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button type="submit" className="w-56  bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Send It to the Operator</button>
          </div>
          
        </form>
      </div>

      {/* Footer Note */}
      <div className="w-full text-center py-4 bg-gray-200">
        <p>Note: Optimum time = setting time + ideal cycle time</p>
      </div>
    </div>
  );
};

export default Supervisor;
