import { HashRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./store";

import Home from "./pages/home";
import Detail from "./pages/detail";
import Section from "./pages/section";
import Admin from "./pages/admin";
import Management from "./pages/management";
import Metrics from "./pages/metrics";
import Login from "./pages/login";
import Register from "./pages/register";
import { useState } from "react";

function App() {
  const typeUser = useSelector((state: RootState) => state.auth);

  return (
    <div className="App">
      <Router>
        {typeUser === "admin" ? <Admin /> : <></>}
        {typeUser === "author" ? <Admin /> : <></>}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/manage" element={<Management />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:sectionName" element={<Section />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
