import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import MyChart from "./components/Chart";
import { PullToRefresh } from "react-js-pull-to-refresh";
import {
  PullDownContent,
  ReleaseContent,
  RefreshContent,
} from "react-js-pull-to-refresh";

const BACKEND_API = process.env.REACT_APP_BACKEND_API || ""

interface DataType {
  0: string[];
  1: number[];
  2: number[];
}

export interface ChartJSDataType {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill?: boolean;
    borderColor?: string;
    pointRadius?: number;
    borderWidth?: number;
  }[];
}

export interface TempHeaderType {
  inside: number;
  outside: number;
}

function App() {
  async function getTemps(): Promise<void> {
    let res = await fetch(
      BACKEND_API,
      {
        method: "GET",
      }
    );
    let json = await res.json();
    let data: DataType = JSON.parse(json.body);
    setChartData(data);
    setTempHeaderState({
      inside: data[1][data[1].length - 1],
      outside: data[2][data[2].length - 1],
    });
  }

  const [tempHeaderState, setTempHeaderState] = useState({
    inside: NaN,
    outside: NaN,
  });

  function reducer(state: ChartJSDataType, action: DataType): ChartJSDataType {
    if (action[0].length) {
      state = {
        labels: action[0],
        datasets: [
          {
            label: "Inside",
            data: action[1],
            fill: false,
            borderColor: "#5c6bc0",
            pointRadius: 1,
            borderWidth: 5,
          },
          {
            label: "Outside",
            data: action[2],
            fill: false,
            borderColor: "#43a047",
            pointRadius: 1,
            borderWidth: 5,
          },
        ],
      };
    }
    return state;
  }

  const [chartData, setChartData] = useReducer(reducer, {
    labels: [],
    datasets: [
      {
        label: "Inside",
        data: [],
      },
      {
        label: "Outside",
        data: [],
      },
    ],
  });

  useEffect(() => {
    getTemps();
  }, []);

  return (
      <PullToRefresh
        pullDownContent={<PullDownContent />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={100}
        onRefresh={getTemps}
        triggerHeight={50}
        backgroundColor="#263238"
        startInvisible={true}
      >
        <main style={{height: '100vh'}} className="App">
          <h1>CozyBaby</h1>
          <hr />
          {chartData.labels.length ? (
            <div style={{ animation: "fadeIn 1s" }}>
              <h2 className="inside">
                Inside: {tempHeaderState.inside.toFixed(1).toString()}°
              </h2>
              <h2 className="outside">
                Outside: {tempHeaderState.outside.toFixed(1).toString()}°
              </h2>
              <MyChart data={chartData} />
            </div>
          ) : (
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          )}
        </main>
      </PullToRefresh>
  );
}

export default App;
