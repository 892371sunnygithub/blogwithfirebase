import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { CustomHeroData } from "./customHeroData";
import "./index.css";
const HeroSection = () => {
  return (
    <div className="herosection">
      <Carousel>
        {CustomHeroData.map((curElm, index) => (
          <Carousel.Item key={index}>
            <img src={curElm.imageurl} alt="bannerImage" />
            <Carousel.Caption>
              <h3>{curElm.title} </h3>
              <p className="text-white">{curElm.paragraph} </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
