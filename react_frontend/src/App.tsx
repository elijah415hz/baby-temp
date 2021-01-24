import React, { useEffect, useReducer } from 'react';
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
    borderColor: string
  }[]
}

function App() {
  async function getTemps(): Promise<void> {
    let res = await fetch(`https://cq661ei9wa.execute-api.us-west-2.amazonaws.com/authFree/helloWorld`, {
      method: 'GET'
    })
    let json = await res.json()
    console.log(JSON.parse(json.body))
    setChartData(JSON.parse(json.body))
  }

  function reducer(state: ChartJSDataType, action: DataType): ChartJSDataType {
    if (action.labels.length) {
      state = {
        labels: action.labels,
        datasets: [
          {
            label: "Inside",
            data: action.inside,
            fill: false,
            borderColor: "blue"
          },
          {
            label: "Outside",
            data: action.outside,
            fill: false,
            borderColor: "green"
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
        borderColor: "blue"
      },
      {
        label: "Outside",
        data: [],
        fill: false,
        borderColor: "green"
      }
    ]
  })

  useEffect(() => {
    getTemps()
    setInterval(getTemps, 600000)
  }
    , [])

  return (
    <div className="App">
      <header>
        <h1>CozyBaby</h1>
      </header>
      <div className="App-body">
        <MyChart data={chartData} />
      </div>
    </div>
  );
}

export default App;
