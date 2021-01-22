import React from "react";
import { Container } from '@material-ui/core';
import { Line } from "react-chartjs-2";
import {DataType} from "./App"

export default function WallChart({data}: {data: DataType}) {
    return (
        <Container>
            <Line data={data} height={400} options={{
		maintainAspectRatio: false
	}}/>
        </Container>
    );
}