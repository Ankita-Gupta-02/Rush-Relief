import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Landing from "./Landing";
import Home from "./Home";
import About from "./About";
import Cart from "./Cart";

function Dash() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default Dash;
