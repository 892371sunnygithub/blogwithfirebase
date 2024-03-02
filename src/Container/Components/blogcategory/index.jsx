import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { CustomCategoryData } from "./categoryData";
import ReadMoreBlogPara from "../ReadMoreBlogPara";
import "./index.css";
const BlogCategory = () => {
  const [show, setShow] = useState(false);
  const [para, setPara] = useState("");
  const readmorehandler = (para) => {
    setShow(true);
    setPara(para);
  };
  return (
    <div className="container-fluid">
      <h2 className="text-center mt-4 mb-4">{CustomCategoryData.heading} </h2>
      <div className="blogcategory">
        <div className="row">
          {CustomCategoryData.cardData.map((curElm, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div className="cardData">
                <Card className="innercard">
                  <Card.Img variant="top" src={curElm.imageurl} />
                  <Card.Body>
                    <Card.Title>{curElm.title} </Card.Title>
                    <Card.Text className="line_clamp">
                      {curElm.paragraph}
                    </Card.Text>
                    <button
                      className="btn btn-secondary"
                      onClick={() => readmorehandler(curElm.paragraph)}
                    >
                      Read More
                    </button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ))}
        </div>
        {show && (
          <ReadMoreBlogPara
            show={show}
            paragraph={para}
            hide={() => setShow(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BlogCategory;
