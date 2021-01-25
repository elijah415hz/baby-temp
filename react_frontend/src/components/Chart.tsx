import React from "react";
import { Container } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import { ChartJSDataType } from "../App"

export default function MyChart({ data }: { data: ChartJSDataType }) {
    return (
        <Container>
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
        </Container>
    );
}