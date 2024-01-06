import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import GetOne from "../views/GetOne";
import Cart from "../views/Cart";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getOne" element={<GetOne />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default Router;
