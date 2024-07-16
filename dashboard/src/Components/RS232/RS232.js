import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const RS232 = () => {
    const chartRef = useRef(null);
    const [dataPoints, setDataPoints] = useState([]);
    const [options, setOptions] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Real-time RS232 Data"
        },
        axisX: {
            title: "Time",
            valueFormatString: "HH:mm:ss"
        },
        axisY: {
            title: "Data"
        },
        data: [{
            type: "line",
            dataPoints: []
        }]
    });

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(intervalId);
    }, []);

    const fetchData = () => {
        axios.get("https://cmti-edge.online/digitaltwin/rs232.php")
            .then(response => {
                const { DATA, timestamp } = response.data;
                const time = new Date(timestamp);

                const newDataPoints = [...dataPoints, { x: time, y: parseFloat(DATA) }];

                // Keep only the last 50 data points to avoid overwhelming the chart
                if (newDataPoints.length > 50) {
                    newDataPoints.shift();
                }

                setDataPoints(newDataPoints);
                setOptions(prevOptions => ({
                    ...prevOptions,
                    data: [{
                        type: "line",
                        dataPoints: newDataPoints
                    }]
                }));

                if (chartRef.current) {
                    chartRef.current.render();
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
    return (
        <div className="mx-auto p-4">
            <h1 className='text-2xl md:text-3xl lg:text-4xl flex justify-center items-center font-semibold'>RS232</h1>
            <div className="melt_back  lg:w-1/2">
                <Breadcrumb />
            </div>
            <div className='text-lg md:text-xl lg:text-2xl flex justify-center px-20 md:justify-start mt-6 md:mt-10 lg:mt-14'>
                Received Data
            </div>
            <div className="w-full flex flex-col mt-3 px-4 md:px-12 lg:px-20">
                <div className="graph-container mt-4 md:mt-6">
                    <div>
                        <CanvasJSChart
                            options={options}
                            onRef={ref => chartRef.current = ref}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RS232;
