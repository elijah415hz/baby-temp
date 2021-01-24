import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import MyChart from './components/Chart'

export interface DataType {
  labels: string[],
  outside: number[],
  inside: number[]
}

export interface ChartJSDataType {
  labels: string[],
  datasets: {
    label: string,
    data: number[],
    fill: boolean,
    borderColor: string,
    pointRadius: number,
    borderWidth: number
  }[]
}

export interface TempHeaderType {
  inside: number,
  outside: number
}

function App() {
  async function getTemps(): Promise<void> {
    let res = await fetch(`https://cq661ei9wa.execute-api.us-west-2.amazonaws.com/authFree/helloWorld`, {
      method: 'GET'
    })
    let json = await res.json()
    let data: DataType = JSON.parse(json.body)
    setChartData(data)
    setTempHeaderState({
      inside: data.inside[data.inside.length - 1],
      outside: data.outside[data.inside.length - 1]
    })
  }

  const [tempHeaderState, setTempHeaderState] = useState({
    inside: NaN,
    outside: NaN
  })

  function reducer(state: ChartJSDataType, action: DataType): ChartJSDataType {
    if (action.labels.length) {
      state = {
        labels: action.labels,
        datasets: [
          {
            label: "Inside",
            data: action.inside,
            fill: false,
            borderColor: "blue",
            pointRadius: 0,
            borderWidth: 8
          },
          {
            label: "Outside",
            data: action.outside,
            fill: false,
            borderColor: "green",
            pointRadius: 0,
            borderWidth: 8
          }
        ]
      }
    }
    return state
  }

  const [chartData, setChartData] = useReducer(reducer, {
    labels: [],
    datasets: [
      {
        label: "Inside",
        data: [],
        fill: false,
        borderColor: "blue",
        pointRadius: 0,
        borderWidth: 8
      },
      {
        label: "Outside",
        data: [],
        fill: false,
        borderColor: "green",
        pointRadius: 0,
        borderWidth: 8
      }
    ]
  })

  useEffect(() => {
    getTemps()
    setInterval(getTemps, 600000)
  },[])

  return (
    <div className="App">
      <header>
        <h1>CozyBaby</h1>
      </header>
      <div className="App-body">
        <h2>Inside: {tempHeaderState.inside.toFixed(1).toString()}° | Outside: {tempHeaderState.outside.toFixed(1).toString()}°</h2>
        <MyChart data={chartData} />
      </div>
    </div>
  );
}

export default App;
