import React, { useEffect, useState } from 'react';
import './App.css';

export interface DataType {
  timestamp: string,
  outside_temp: number,
  room_temp: number
}[]


function App() {
  async function getTemps(): Promise<void> {
    let res = await fetch(`https://cq661ei9wa.execute-api.us-west-2.amazonaws.com/authFree/helloWorld`, {
      method: 'GET'
    })
    let json = await res.json()
    console.log(json.body)
    setData(json.body)
  }
  let [data, setData] = useState<DataType>({
    timestamp: "",
    outside_temp: 0,
    room_temp: 0
  })

  useEffect(() => {
    setInterval(getTemps, 600000)
  }
  , [])

  return (
    <div className="App">
      <header>
        <h1>CozyBaby</h1>
      </header>
      <body className="App-body">
        <button onClick={getTemps}>Temps!</button>
      </body>
    </div>
  );
}

export default App;
