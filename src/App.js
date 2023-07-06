import React from "react";

import "./scss/app.scss";

import Header from "./components/Header.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <NotFound />
        </div>
      </div>
    </div>
  );
}

export default App;
