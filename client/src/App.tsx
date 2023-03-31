import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Detail from "./pages/detail";
import Section from "./pages/section";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/:sectionName" element={<Section />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
