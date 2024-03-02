import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./index.css";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import { fireDB, firebaseStorage } from "../../../../FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ButtonSpinner from "../../../Components/ButtonSpinner";
import { CustomCategoryData } from "../../../Components/blogcategory/categoryData";
const CreateBlog = () => {
  const navigate = useNavigate();
  const { allUsers, getFirebaseData, loading, setLoading, userData } =
    useGlobalContext();
  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    userprofile: "",
    useremail: "",
    blogtitle: "",
    blogcategory: "",
    blogpara: "",
    blogimage: "",
    time: Timestamp.now(),
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const { blogtitle, blogpara, blogimage, blogcategory } = formData;
  const filterUser = allUsers.find(
    (curElm) => curElm.uid == userData?.authObject?.uid
  );
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setFormData({ ...formData, blogimage: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogtitle && !blogpara && !blogimage) {
      toast.error("All fields are required");
    } else if (!blogtitle) {
      toast.error("blog title is required");
    } else if (!blogcategory) {
      toast.error("blog category is required");
    } else if (!blogpara) {
      toast.error("blog paragraph is required");
    } else if (!blogimage) {
      toast.error("blog image is required");
    } else {
      setLoading(true);
      try {
        const storageRef = ref(
          firebaseStorage,
          `blog_images/${Date.now()}-${blogimage.name}`
        );
        await uploadBytes(storageRef, blogimage);
        const imageURL = await getDownloadURL(storageRef);
        const userRef = collection(fireDB, "blogs");
        await addDoc(userRef, {
          ...formData,
          blogimage: imageURL,
        });
        toast.success("Blog Cretaed Successfull");
        navigate("/user/blogs");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getFirebaseData();
  }, []);

  useEffect(() => {
    if (filterUser) {
      setFormData({
        ...formData,
        userid: filterUser?.uid,
        username: filterUser?.name,
        useremail: filterUser?.email,
        userprofile: filterUser?.profileimage || "",
      });
    }
  }, [filterUser]);

  return (
    <div className="createblog pt-4">
      <div className="container">
        <h4 className="text-center text-white">CREATE YOUR BLOG</h4>
        <div className="row">
          <div className="col-md-12 text-white">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  name="blogtitle"
                  value={blogtitle}
                  onChange={handleInput}
                  type="text"
                  placeholder="Enter blog title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Blog Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="blogcategory"
                  value={blogcategory}
                  onChange={handleInput}
                >
                  <option>Choose category </option>
                  {CustomCategoryData.cardData.map((curElm, index) => (
                    <option value={curElm.title} key={index}>
                      {curElm.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPara">
                <Form.Label>About Blog</Form.Label>
                <Form.Control
                  name="blogpara"
                  value={blogpara}
                  onChange={handleInput}
                  as="textarea"
                  placeholder="Leave a blog para"
                  style={{ height: "150px" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPicture">
                <Form.Label>Blog Image</Form.Label>
                <Form.Control
                  name="blogimage"
                  onChange={handleImage}
                  type="file"
                  placeholder="Enter blog picture"
                />
              </Form.Group>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="blogimage"
                  className="blogimage"
                />
              )}
              <button className="btn btn-secondary">
                {loading ? <ButtonSpinner /> : "Add Blog"}
              </button>
              <NavLink className={"btn btn-danger ms-2"} to="/user/blogs">
                Cancel
              </NavLink>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
