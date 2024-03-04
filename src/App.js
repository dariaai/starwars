import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlanetsTable from "./Components/PlanetsTable";
import PlanetDetails from "./Components/PlanetDetails";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PlanetsTable />} />
          <Route path="/details/:planetNumber" element={<PlanetDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
