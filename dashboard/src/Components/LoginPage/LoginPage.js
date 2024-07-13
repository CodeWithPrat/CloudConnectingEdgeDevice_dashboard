import React from 'react';
import cmtilogo from "../../Images/CCED_imgs/cmtiLogo.jpeg";
import opimg from "../../Images/CCED_imgs/operator.jpg";
import supimg from "../../Images/CCED_imgs/supervisor.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
     <div className="w-full flex items-center justify-center bg-white shadow-md py-4 mb-8">
        <img src={cmtilogo} alt="Company Logo" className="h-36 mr-4" />
        <h1 className="text-5xl font-bold text-sky-700" style={{ fontFamily: 'serif' }}>
          Cloud Connecting EDGE Device
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-4">
            <div className="h-16 w-16 mb-4">
              <img src={supimg} alt="Supervisor Logo" className="h-full w-full rounded-full" />
            </div>
            <h2 className="text-xl font-bold mb-4">Supervisor Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="mb-4 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Sign In</button>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center mb-4">
            <div className="h-16 w-16 mb-4">
              <img src={opimg} alt="Operator Logo" className="h-full w-full rounded-full" />
            </div>
            <h2 className="text-xl font-bold mb-4">Operator Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="mb-4 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
