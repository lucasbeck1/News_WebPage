import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Detail from "./pages/detail";
import Section from "./pages/section";
import Admin from "./pages/admin";
import Management from "./pages/management";
import Metrics from "./pages/metrics";

function App() {
  return (
    <div className="App">
      <Router>
        <Admin />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/:sectionName" element={<Section />} />
          <Route path="/manage" element={<Management />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
