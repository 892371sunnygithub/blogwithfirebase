import React from "react";
import "./index.css";
import { CustomGetStartedData } from "./customgetstarteddata";
import { useNavigate } from "react-router-dom";
const GetStarted = () => {
  const navigate = useNavigate();
  const startHandler = () => {
    navigate("/user/blogs");
  };
  return (
    <div className="getstarted">
      <div className="innerdata">
        <div className="text-center">
          <h1 className="text-white">{CustomGetStartedData.heading} </h1>
          <p className="text-white">{CustomGetStartedData.paragraph}</p>
          <button className="btn btn-secondary" onClick={() => startHandler()}>
            EnterInTheWorld
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
