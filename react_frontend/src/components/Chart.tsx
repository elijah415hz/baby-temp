import React from "react";
import { Line, defaults } from "react-chartjs-2";
import { ChartJSDataType } from "../App"

defaults.global.maintainAspectRatio = false


export default function MyChart({ data }: { data: ChartJSDataType }) {
    return (
        <div style={{minHeight: "50vh", maxWidth: "1000px", margin: "auto", padding: "10px"}}>
            <Line data={data} options={{
                legend: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            fontColor: "#455a64"
                        },
                        gridLines: {
                            color: "#37474f"
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            fontColor: "#455a64"
                        },
                        gridLines: {
                            color: "#37474f"
                        }
                    }]
                }
            }} />
        </div>
    );
}