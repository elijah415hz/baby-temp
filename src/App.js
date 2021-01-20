import './App.css';

function getTemps() {
  fetch(`https://cq661ei9wa.execute-api.us-west-2.amazonaws.com/authFree/helloWorld`, {
    method: 'GET'
}).then(res => res.json()).then(data => console.log(data.body))
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <button onClick={getTemps}>Temps!</button>
      </header>
    </div>
  );
}

export default App;
