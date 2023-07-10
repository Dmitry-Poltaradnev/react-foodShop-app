import React from "react";

import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Cart from "./Pages/Cart";

import { Routes, Route } from "react-router-dom";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
