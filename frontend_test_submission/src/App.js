import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import RedirectHandler from "./pages/RedirectHandler";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="nav-bar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/stats" className="nav-link">Stats</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path=":code" element={<RedirectHandler />} />

        </Routes>
      </div>
    </Router>
  );
}
