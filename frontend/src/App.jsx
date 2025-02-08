import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Dash from "./Pages/Dash";
import Cart from "./Pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dash/*" element={<Dash />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<Navigate to={"/dash/landing"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
