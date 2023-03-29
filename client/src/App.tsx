import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/home";
import Detail from "./pages/Detail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
