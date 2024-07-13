import React, { useEffect, useState } from 'react';
import cmtilogo from "../../Images/CCED_imgs/cmtiLogo.jpeg";
import idimg from "../../Images/CCED_imgs/idCard.jpg";
import machineImg from "../../Images/CCED_imgs/machine.jpg";
import "./MainPage.css"
function MainPage() {
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
            <div className="flex flex-wrap justify-center items-center p-4">
                <div className="w-full md:w-1/2 p-2">
                    <img src={idimg} alt="IDImage" className="idCard h-auto object-contain" />
                </div>
                <div className="w-full md:w-1/2 p-2">
                    <img src={machineImg} alt="MachineImage" className="machineImg h-auto object-contain" />
                </div>
            </div>
            /
        </div>
    )
}

export default MainPage
