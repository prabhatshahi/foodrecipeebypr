import React from "react";

import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import AddToFavorite from "./Pages/AddToFavorite";
import Find from "./Pages/Find";
import ItemSummary from "./Pages/ItemSummary";
const App = () => {
  return (
    <div className="main">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorite" element={<AddToFavorite />} />
        <Route path="/Find/:search" element={<Find />} />
        <Route path="/recipe/:name" element={<ItemSummary />} />
      </Routes>
    </div>
  );
};

export default App;
