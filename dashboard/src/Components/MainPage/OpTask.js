import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cmtilogo from '../../Images/CCED_imgs/cmtiLogo.jpeg'; // Adjust the import to your logo image path

function Task() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [assignedJob, setAssignedJob] = useState('');
    const [assignedShifts, setAssignedShifts] = useState('');
    const [optimumTime, setOptimumTime] = useState('');
    const [targetParts, setTargetParts] = useState('');
    const [machineStatus, setMachineStatus] = useState('Off');
    const [operatingMode, setOperatingMode] = useState('');
    const [currentJob, setCurrentJob] = useState('');
    const [shiftStatus, setShiftStatus] = useState('');
    const [partCount, setPartCount] = useState('');

    useEffect(() => {
        // Fetch data from backend using Axios
        const fetchData = async () => {
            try {
                const response = await axios.get('https://your-backend-api/dashboard-data');
                const data = response.data;

                setAssignedJob(data.job);
                setAssignedShifts(data.shifts);
                setOptimumTime(data.timePerPart);
                setTargetParts(data.targetParts);
                setMachineStatus(data.machineStatus);
                setOperatingMode(data.operatingMode);
                setCurrentJob(data.currentJob);
                setShiftStatus(data.shiftStatus);
                setPartCount(data.partCount);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className=" justify-between bg-gray-100 ">
            {/* Dashboard */}
            <div className="flex-grow flex flex-col items-center justify-center">
                <h2 className="text-4xl font-bold mb-6 text-gray-800 " >Operator Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-7xl">
                    {/* Assigned Job */}
                    <div className="bg-white flex justify-center items-center p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Assigned Job for Today</h3>
                        <p className="text-lg">{assignedJob}</p>
                    </div>

                    {/* Assigned Shifts */}
                    <div className="bg-white flex justify-center items-center p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Number of Shifts</h3>
                        <p className="text-lg">{assignedShifts}</p>
                    </div>

                    {/* Optimum Time */}
                    <div className="bg-white flex justify-center items-center p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Optimum Time for Each Part</h3>
                        <p className="text-lg">{optimumTime}</p>
                    </div>

                    {/* Target Parts */}
                    <div className="bg-white flex justify-center items-center p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Estimated Target Parts</h3>
                        <p className="text-lg">{targetParts}</p>
                    </div>

                    {/* Machine Status */}
                    <div className="bg-white flex justify-center items-center p-4 gap-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Machine Status</h3>
                        <div className={`rounded-full w-16 h-16 flex items-center justify-center ${machineStatus === 'Running' ? 'bg-green-500' : 'bg-red-500'}`}>
                            <p className="text-white font-bold text-lg">{machineStatus}</p>
                        </div>
                    </div>

                    {/* Operating Mode */}
                    <div className="bg-white flex justify-center items-center p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Operating Mode</h3>
                        <p className="text-lg">{operatingMode}</p>
                    </div>

                    {/* Current Job */}
                    <div className="bg-white flex justify-center items-center p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Current Job</h3>
                        <p className="text-lg">{currentJob}</p>
                    </div>

                    {/* Shift Status */}
                    <div className="bg-white flex justify-center items-center p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Shift Status</h3>
                        <p className="text-lg">{shiftStatus}</p>
                    </div>

                    {/* Part Count */}
                    <div className="bg-white flex justify-center items-center p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Part Count</h3>
                        <p className="text-lg">{partCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;