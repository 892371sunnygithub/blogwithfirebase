import React, { useState } from "react";
import { CustomServicesData } from "./customServicesData";
import "./index.css";
import { Button } from "react-bootstrap";
import ReadMoreBlogPara from "../ReadMoreBlogPara";
const BlogServices = () => {
  const [show, setShow] = useState(false);
  const [para, setPara] = useState("");
  const learnMorehandler = (para) => {
    setShow(true);
    setPara(para);
  };
  return (
    <div className="blogservices">
      <section className="topsection">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <span>
                <img
                  src={CustomServicesData.sectionimage}
                  alt="servicesimage"
                />
              </span>
              <h3 className="text-center">{CustomServicesData.heading} </h3>
              <p className="text-center">{CustomServicesData.sectionpara} </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bottomsection">
        <div className="container">
          <h3 className="text-center">Choose Our Services </h3>
          {CustomServicesData.cardData.map((curElm, index) => (
            <div className="row" key={index}>
              <div className="col-md-9 mx-auto">
                <div className="carddata">
                  <div className="d-flex align-items-center responsive_card">
                    <div className="imagedata">
                      <img src={curElm.imageurl} alt="servicescardimage" />
                    </div>
                    <div className="ms-3 sm:text-center">
                      <h5>{curElm.title} </h5>
                      <p className="line_clamp">{curElm.paragraph} </p>
                      <Button
                        variant="success"
                        onClick={() => learnMorehandler(curElm.paragraph)}
                      >
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {show && (
          <ReadMoreBlogPara
            show={show}
            hide={() => setShow(false)}
            paragraph={para}
          />
        )}
      </section>
    </div>
  );
};

export default BlogServices;
