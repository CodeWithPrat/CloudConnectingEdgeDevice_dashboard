import React, { useEffect, useState } from 'react';
import Plotly from 'plotly.js-dist';

const RS232 = () => {
    const [plotInitialized, setPlotInitialized] = useState(false);

    useEffect(() => {
        const interval = setInterval(fetchDataAndGraph, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchDataAndGraph = () => {
        fetchData();
        fetchGraphData();
    };

    const fetchData = () => {
        fetch('https://cmti-edge.online/smddc/AMSINDIA.php')
            .then(response => response.json())
            .then(data => {
                if (!data) {
                    console.log('Data not available');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const fetchGraphData = () => {
        fetch('https://cmti-edge.online/smddc/fft.php')
            .then(response => response.json())
            .then(data => {
                const xData = JSON.parse(data.x.replace(/"/g, ''));
                const yData = JSON.parse(data.y.replace(/"/g, ''));
                const trace = { x: xData, y: yData, mode: 'lines', type: 'scatter' };
                const layout = {
                    title: 'Chart',
                };
                Plotly.newPlot('myDiv', [trace], layout);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div className="mx-auto p-4">

            <h1 className='text-2xl md:text-3xl lg:text-4xl flex justify-center items-center font-semibold'>RS232</h1>
            <div className='text-lg md:text-xl lg:text-2xl flex justify-center px-20 md:justify-start mt-6 md:mt-10 lg:mt-14'>
                Received Data
            </div>
            <div className="w-full flex flex-col mt-3 px-4 md:px-12 lg:px-20">
                <div className="graph-container mt-4 md:mt-6">
                    <div id="myDiv" className="graph"></div>
                </div>
            </div>
        </div>
    );
};

export default RS232;
