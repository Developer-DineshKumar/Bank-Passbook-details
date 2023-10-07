import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
import "./App.css";
import Vendordetails from "./components/Vendordetails";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Vendordetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
