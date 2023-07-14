import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<<<<<<< HEAD
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
=======
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
>>>>>>> add_new_reduxLogic
);
