import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlanetsTable from "./PlanetsTable";
import PlanetDetails from "./PlanetDetails";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PlanetsTable />} />
          <Route path="/details" element={<PlanetDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
