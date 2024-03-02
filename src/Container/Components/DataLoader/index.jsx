import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./index.css";
const DataLoader = () => {
  return (
    <div className="dataloader">
      <Spinner animation="grow" />
      <Spinner animation="grow ms-1" />
      <Spinner animation="grow ms-1" />
    </div>
  );
};

export default DataLoader;
