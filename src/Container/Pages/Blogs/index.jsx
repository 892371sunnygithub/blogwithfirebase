import React, { useEffect, useState } from "react";
import ReadMoreBlogPara from "../../Components/ReadMoreBlogPara";
import { useGlobalContext } from "../../context";
import { Card } from "react-bootstrap";
import DataLoader from "../../Components/DataLoader";
import "./index.css";
const Blogs = () => {
  const { blogs, getFirebaseBlogs, loading } = useGlobalContext();
  const [show, setShow] = useState(false);
  const [para, setPara] = useState("");
  const [title, setTitle] = useState("");
  const readmorehandler = (curElm) => {
    setShow(true);
    setPara(curElm.blogpara);
    setTitle(curElm.blogtitle);
  };
  useEffect(() => {
    getFirebaseBlogs();
  }, []);

  if (loading) {
    return <DataLoader />;
  }

  return (
    <div className="blogsWrapper pb-5 pt-2">
      <div className="container">
        <h2 className="mt-2">BLOGS LISTING</h2>
        <div className="cardWrapper">
          <div className="row">
            {blogs && blogs.length > 0 ? (
              blogs.map((curElm) => (
                <div className="col-md-4 mb-3" key={curElm.id}>
                  <div className="cardData">
                    <Card className="innercard">
                      <Card.Img variant="top" src={curElm.blogimage} />
                      <Card.Body>
                        <Card.Title className="text-uppercase">
                          {curElm.blogcategory}
                        </Card.Title>
                        <Card.Text className="line_clamp">
                          {curElm.blogpara}
                        </Card.Text>
                      </Card.Body>
                      <div className="userifo d-flex justify-content-between p-3 align-items-center">
                        <button
                          className="btn btn-secondary btn-sm text-white"
                          onClick={() => readmorehandler(curElm)}
                        >
                          Read More
                        </button>
                        <h6 className="text-capitalize ps-2 mb-0">
                          Blogger {curElm.username}
                        </h6>
                      </div>
                    </Card>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-4">blogs not found</p>
            )}
          </div>
        </div>
      </div>
      {show && (
        <ReadMoreBlogPara
          show={show}
          paragraph={para}
          title={title}
          hide={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default Blogs;
