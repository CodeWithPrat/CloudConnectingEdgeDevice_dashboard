import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cmtilogo from "../../Images/CCED_imgs/cmtiLogo.jpeg";
import idimg from "../../Images/CCED_imgs/idCard.jpg";
import machineImg from "../../Images/CCED_imgs/machine.jpg";
import MainCircularGuage from './CircularGauge';
import "./MainPage.css";
import Task from './OpTask';

function MainPage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleNavigate = (path) => {
        navigate(path); // Function to navigate to the specified path
    };

    return (
        <div className="w-full bg-gray-100">
            {/* Header */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between bg-white shadow-md py-4 px-8">
                <img src={cmtilogo} alt="Company Logo" className="h-20 md:h-36 mr-4 mb-4 md:mb-0" />
                <h1 className="text-2xl md:text-5xl font-bold text-sky-700 mb-4 md:mb-0" style={{ fontFamily: 'serif' }}>
                    Machine To Cloud Connecting EDGE Device
                </h1>
                <div className="text-right font-bold">
                    <p className="text-base md:text-xl">{currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-sm md:text-lg">{currentTime.toLocaleTimeString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 py-5">
                <div className="flex flex-col">
                    <img src={idimg} alt="ID " className="profile_img object-contain" />
                </div>
                <div className="flex flex-col">
                    <img src={machineImg} alt="Machine" className="machine_img object-contain -ml-5" />
                </div>
                <div className="main_task w-full px-2">
                    <Task />
                </div>
            </div>

            <div className="-ml-16">
                <div className="">
                    <MainCircularGuage />
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-wrap justify-center w-full items-center p-4 gap-7 ">
                <button className="mainpage_btn text-white text-center font-bold w-96 h-32 md:w-96 md:h-48 lg:w-[30rem] lg:h-56 rounded-full shadow-lg flex items-center justify-center"
                    onClick={() => handleNavigate('/machinespec')}>
                    <span className="text-xs md:text-base lg:text-lg px-2">Machine Specification and Job Drawings</span>
                </button>
                <button className="mainpage_btn text-white text-center font-bold w-96 h-32 md:w-96 md:h-48 lg:w-[30rem] lg:h-56 rounded-full shadow-lg flex items-center justify-center"
                    onClick={() => handleNavigate('/mainindex')}>
                    <span className="text-xs md:text-base lg:text-lg px-2">Real-Time Data</span>
                </button>
                <button className="mainpage_btn text-white text-center font-bold w-96 h-32 md:w-96 md:h-48 lg:w-[30rem] lg:h-56 rounded-full shadow-lg flex items-center justify-center"
                    onClick={() => handleNavigate('/oee')}>
                    <span className="text-xs md:text-base lg:text-lg px-2">Overall Equipment Effectiveness</span>
                </button>
            </div>
        </div>
    )
}

export default MainPage;
