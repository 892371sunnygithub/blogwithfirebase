import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./Container/Services/Router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {Router.map((curElm, index) => (
          <Route key={index} path={curElm.path} element={curElm.element} />
        ))}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
