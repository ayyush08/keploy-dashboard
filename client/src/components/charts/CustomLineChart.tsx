'use client';
import React from 'react'

import {
    Chart as ChartJS,
    LineElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
} from 'chart.js'

import { Line } from 'react-chartjs-2'


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);




interface ChartDataPoint {
    label: string; 
    value: number; 
    details?: string[]; 
}

interface CustomLineChartProps {
    dataPoints: ChartDataPoint[]; 
    total?: number; 
    title?: string; 
    yAxisLabel?: string; 
    borderColor?: string; 
    backgroundColor?: string;
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({
    dataPoints,
    total,
    title = "Data Over Time",
    yAxisLabel = "Value",
    borderColor = "rgba(75,192,192,1)", // Default neon cyan
    backgroundColor = "rgba(75,192,192,0.2)",
}) => {


    const labels = dataPoints.map((point) => point.label);
    const values = dataPoints.map((point) => point.value);

    const data = {
        labels,
        datasets: [
            {
                label: `${title}`,
                data: values,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                tension: 0.4,
            },
        ],

    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: { color: "#fff" },
                display: false
            },
            tooltip: { enabled: true, },
            title: {
                display: true, 
                text: total !== undefined ? `Total ${title}: ${total}  ` : '',
                color: "#fff", 
                font: {
                    size: 16,
                },
                padding: {
                    top: 10,
                    bottom: 20,
                },
                position: "top" as const, 
            },
        },
        scales: {
            x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.2)" } },
            y: {
                ticks: { color: "#fff" },
                grid: { color: "rgba(255,255,255,0.2)" },
                title: { display: true, text: yAxisLabel, color: "#fff" },
            },
        },
    };

    return (
        <Line data={data} options={options} />
    )
}

export default CustomLineChart