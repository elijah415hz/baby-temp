import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import MyChart from './components/Chart'

interface DataType {
  0: string[],
  1: number[],
  2: number[]
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
      inside: data[1][data[1].length - 1],
      outside: data[2][data[2].length - 1]
    })
  }

  const [tempHeaderState, setTempHeaderState] = useState({
    inside: NaN,
    outside: NaN
  })

  function reducer(state: ChartJSDataType, action: DataType): ChartJSDataType {
    if (action[0].length) {
      state = {
        labels: action[0],
        datasets: [
          {
            label: "Inside",
            data: action[1],
            fill: false,
            borderColor: "blue",
            pointRadius: 0,
            borderWidth: 8
          },
          {
            label: "Outside",
            data: action[2],
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
