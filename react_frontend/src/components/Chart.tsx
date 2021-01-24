import React from "react";
import { Container } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import {ChartJSDataType} from "../App"

export default function MyChart({data}: {data: ChartJSDataType}) {
    return (
        <Container>
            <Line data={data} />
        </Container>
    );
}