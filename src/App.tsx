import { useState } from "react";
import "./App.css";
import { Toolbar, WorkSpace } from "./components";

function App() {
  const [timeRange, setTimeRange] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="App">
      <h1>Weather Visualization Data</h1>
      <Toolbar
        location={location}
        timeRange={timeRange}
        onChangeLocation={setLocation}
        onChangeTimeRange={setTimeRange}
      />
      <WorkSpace timeRange={timeRange} location={location} />
    </div>
  );
}

export default App;
