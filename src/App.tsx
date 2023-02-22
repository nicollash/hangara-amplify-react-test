import { useState } from "react";

import { Toolbar, WorkSpace } from "./components";

import { LOCATIONS } from "constant";

import "./App.css";

function App() {
  const [timeRange, setTimeRange] = useState("");
  const [location, setLocation] = useState(LOCATIONS[0].value);

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
