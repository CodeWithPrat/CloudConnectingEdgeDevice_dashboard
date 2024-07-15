import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cmtilogo from "../../Images/CCED_imgs/cmtiLogo.jpeg";

function MainIndex() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();

    const buttons = [
        { label: 'OPC UA', path: '/rtmain' },
        { label: 'RS232', path: '/rs232' },
        { label: 'MODBUS TCP/IP', path: '/temperature' },
        { label: 'RS485', path: '/rs485' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full bg-gray-100">
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

            {/* Buttons Section */}
            <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100 mt-[-100px]">
                <div className="grid grid-cols-2 gap-4">
                    {buttons.map((button, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(button.path)}
                            className="m-4 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 bg-blue-500 text-white text-xl md:text-2xl lg:text-3xl rounded-full flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-110 hover:bg-blue-600"
                        >
                            {button.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MainIndex;
