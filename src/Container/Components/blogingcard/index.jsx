import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGlobalContext } from "../../context";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";
import { ImageProvider } from "../../Services/ImageProvider";
import { toast } from "react-toastify";
import ButtonSpinner from "../ButtonSpinner";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../../FirebaseConfig";
import DataLoader from "../DataLoader";
import { FaEdit, FaTrash } from "react-icons/fa";
import ReadMoreBlogPara from "../ReadMoreBlogPara";

const BlogingCard = () => {
  const navigate = useNavigate();
  const { blogs, getFirebaseBlogs, loading, setLoading, userData, allUsers } =
    useGlobalContext();
  const [show, setShow] = useState(false);
  const [para, setPara] = useState("");
  const readmorehandler = (para) => {
    setShow(true);
    setPara(para);
  };
  const userblog = blogs.filter(
    (curElm) => curElm.userid === userData?.authObject?.uid
  );
  const filterProfile = allUsers.find(
    (curElm) => curElm.id === userData?.authObject?.id
  );
  const username = filterProfile?.name;
  const deleteHandler = async (curElm) => {
    try {
      setLoading(true);
      const blogid = curElm.id;
      await deleteDoc(doc(fireDB, "blogs", blogid));
      getFirebaseBlogs();
      setLoading(false);
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error.message);
      setLoading(false);
      toast.error("Error deleting blog");
    }
  };

  const updateHandler = (blogid) => {
    navigate(`/user/edit/blog/${blogid}`);
  };

  useEffect(() => {
    getFirebaseBlogs();
  }, []);

  if (loading) {
    return <DataLoader />;
  }
  const time = new Date();
  return (
    <section className="bloginglisthead">
      <div className="container-fluid">
        <div className="topbloginginfo">
          <div className="infodata pt-2">
            <span>
              <img src={ImageProvider.ArtImage} alt="goalimage" />
            </span>
            <h4>
              Lets Drive and Achieve Your Goal
              {" " + time.toLocaleTimeString()}
            </h4>
          </div>
        </div>
        <div className="blogheader">
          <h3 className="blogheading">
            <span>{username} </span>
            's blogs...
          </h3>
          <NavLink className="btn btn-secondary" to={"/user/create/blog"}>
            Create Blog
          </NavLink>
        </div>
        <div className="cardDatablogingcard">
          <div className="row pt-5 pb-5">
            {userblog && userblog.length > 0 ? (
              userblog.map((curElm) => (
                <div className="col-md-4" key={curElm.id}>
                  <div className="cardData">
                    <Card className="innercard">
                      <Card.Img
                        variant="top"
                        className="img-fluid"
                        src={curElm.blogimage}
                      />
                      <Card.Body>
                        <Card.Title className="text-uppercase">
                          {curElm.blogtitle}
                        </Card.Title>
                        <Card.Text className="line_clamp cardpara">
                          {curElm.blogpara}
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <button
                            className="btn btn-dark btn-sm"
                            onClick={() => readmorehandler(curElm.blogpara)}
                          >
                            READMORE
                          </button>
                          <div>
                            <Button
                              variant="secondary"
                              className="btn-sm"
                              onClick={() => updateHandler(curElm.id)}
                            >
                              <FaEdit />
                            </Button>
                            <Button
                              variant="danger ms-2"
                              className="btn-sm"
                              onClick={() =>
                                window.confirm(
                                  "are you sure you want to delete this blog ?"
                                ) && deleteHandler(curElm)
                              }
                            >
                              {loading ? <ButtonSpinner /> : <FaTrash />}
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center mt-4">you have not any blog yet </p>
            )}
          </div>
        </div>
        {show && (
          <ReadMoreBlogPara
            show={show}
            paragraph={para}
            hide={() => setShow(false)}
          />
        )}
      </div>
    </section>
  );
};

export default BlogingCard;
