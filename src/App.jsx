import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";

import HomeContainer from "./components/HomeContainer";
import Login from "./components/login/Login";
import AdminDashboard from "./components/inside/admin/AdminDashboard";
import ManagerDashboard from "./components/inside/manager/ManagerDashboard";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nested routes dành cho path / */}
        <Route path="/" element={<HomeContainer/>}>
          {/* Home route */}
          <Route index element={<Home />} />
          {/* <Route path="path" element={<Component />} /> */}
          <Route path="/login" element={<Login />} />          
        </Route>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
