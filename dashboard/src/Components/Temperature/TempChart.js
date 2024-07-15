import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import moment from 'moment';
import 'highcharts/modules/data';
import 'highcharts/modules/exporting';
import 'highcharts/modules/export-data';
import 'highcharts/modules/accessibility';

const TempChart = ({ selectedSensor }) => {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

    const updateGraph = useCallback(() => {
        axios.get(`https://cmti-edge.online/smddc/graph1.php?date=${selectedDate}`)
            .then(response => {
                const data = response.data;
    
                const labels = [];
                const sensorData = [];
    
                // Generate labels for x-axis from 8:00 to 17:00 with 15-minute intervals
                const startHour = 8;
                const endHour = 17;
                for (let hour = startHour; hour <= endHour; hour++) {
                    for (let minute = 0; minute < 60; minute += 15) {
                        const time = moment(`${selectedDate}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`);
    
                        labels.push(time.toISOString());
                    }
                }
    
                // Fill data arrays based on the fetched data
                labels.forEach(label => {
                    const dataObject = data.find(obj => {
                        const createdTime = moment(obj.created_at, 'YYYY-MM-DD HH:mm:ss');
                        return createdTime.isSame(label, 'minute');
                    });
    
                    sensorData.push(dataObject ? parseFloat(dataObject[selectedSensor.toLowerCase()]) : 0);
                });
    
                updateHighcharts(labels, sensorData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [selectedDate, selectedSensor]);
    

    const updateHighcharts = (labels, sensorData) => {
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: `Temperature Graph - ${selectedSensor}`,
            },
            xAxis: {
                categories: labels,
                type: "datetime",
                labels: {
                    formatter: function () {
                        const date = new Date(this.value);
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const formattedHours = hours % 12 || 12;
                        const formattedMinutes = minutes.toString().padStart(2, '0');
                        return `${formattedHours}:${formattedMinutes} ${ampm}`;
                    },
                },
                title: {
                    text: "Time",
                },
            },
            
            yAxis: {
                title: {
                    text: "Temperature (°C)",
                },
            },
            legend: {
                align: "left",
                verticalAlign: "top",
                borderWidth: 0,
            },
            tooltip: {
                shared: true,
                crosshairs: true,
            },
            plotOptions: {
                series: {
                    cursor: "pointer",
                    className: "popup-on-click",
                    marker: {
                        lineWidth: 1,
                    },
                },
            },
            series: [
                { name: selectedSensor, data: sensorData },
            ],
        });
    };

    useEffect(() => {
        updateGraph();
    }, [updateGraph]);

    return (
        <div className="chart-container max-w-screen mx-auto px-4">
            <div id="container" className="chart mb-8"></div>
        </div>
    );
};

export default TempChart;