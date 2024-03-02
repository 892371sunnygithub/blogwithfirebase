import React, { useState } from "react";
import "./index.css";
import { ImageProvider } from "../../Services/ImageProvider";
import { NavLink } from "react-router-dom";
const SpeedWrite = () => {
  const [time, setTime] = useState("");
  return (
    <div className="pt-3">
      <h2 className="headingspeed">
        INSPIRING TEMPLATES FOR EVERY <br /> CONTENT NEED
      </h2>
      <div className="speedWriteWrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h2 className="speedheadbottom">
                READY TO WRITE AT <br /> THE SPEED OF LIGHT?
              </h2>
              <p className="text-white">
                See how easy it can be to write amazing content.Now you can
                easily create content in one place.Start using Creatibot to
                simplify create content with AI copywriting Creatibot.
              </p>
              <NavLink className={"nav-link"} to="/login">
                <button className="btn">Start Writing for Free</button>
              </NavLink>
            </div>
            <div className="col-md-4">
              <img
                src={ImageProvider.NewsImage}
                alt="image"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
        <div className="d-none">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="form-control w-25 m-auto mt-4"
          />
          <button
            onClick={() => console.log("clicked time", time)}
            className="m-auto d-block mt-2 btn btn-dark"
          >
            Get Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeedWrite;
