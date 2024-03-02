import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
const AboutBlog = () => {
  return (
    <div className="aboutwrapper">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12">
            <h1 className="">Welcome to Firenze!</h1>
            <p>
              Hello there! Welcome to Firenze, where we inspire, nurture your
              interests, and connect you with a vibrant community. Firenze is a
              platform dedicated to bringing you fresh ideas, fostering
              creativity, and spreading positivity. Here, we celebrate each
              individual's unique journey, share their stories, and learn from
              one another. Our goal is to create an inclusive space where
              everyone can explore their passions, embrace new experiences, and
              learn from each other. You'll find informative articles, inspiring
              stories, creative content, and a supportive community here.
              Whether you're seeking lifestyle tips, an artistic dose, or the
              latest trends in technology, Firenze provides a space for
              everyone. We're here for every member of the Firenze family. Come,
              join us, and be a part of a vibrant and positive journey! <br />
              <br /> Thank you, Team Frenzo
            </p>
            <NavLink className={"nav-link"} to={"/login"}>
              <button className="btn btn-secondary">Get Started</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBlog;
