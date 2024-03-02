import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useGlobalContext } from "../../../context";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { fireDB, firebaseStorage } from "../../../../FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ButtonSpinner from "../../../Components/ButtonSpinner";
const UpdateBlog = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    blogtitle: "",
    blogcategory: "",
    blogpara: "",
    blogimage: "",
  });
  const { id } = useParams();
  const { blogs, getFirebaseBlogs, loading, setLoading } = useGlobalContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const { blogtitle, blogcategory, blogpara, blogimage } = formData;
  const objectData = blogs.find((curElm) => curElm.id === id);
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
    } else if (!blogpara) {
      toast.error("blog paragraph is required");
    } else if (!blogimage) {
      toast.error("blog image is required");
    } else {
      try {
        setLoading(true);
        const blogDocRef = doc(fireDB, "blogs", id);
        if (formData.blogimage instanceof File) {
          const storageRef = ref(firebaseStorage, `blog_images/${id}`);
          await uploadBytes(storageRef, formData.blogimage);
          const imageUrl = await getDownloadURL(storageRef);
          await updateDoc(blogDocRef, {
            blogtitle,
            blogpara,
            blogimage: imageUrl,
          });
        } else {
          await updateDoc(blogDocRef, {
            blogtitle,
            blogpara,
          });
        }
        toast.success("Blog updated successfully");
        navigate(`/user/blogs`);
        setLoading(false);
      } catch (error) {
        console.error("Error updating blog:", error.message);
        toast.error("Error updating blog. Please try again.");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (objectData) {
      setFormData({
        ...formData,
        userid: objectData.userid,
        username: objectData.username,
        blogtitle: objectData.blogtitle,
        blogcategory: objectData.blogcategory,
        blogpara: objectData.blogpara,
        blogimage: objectData.blogimage,
      });
    }
  }, [id, objectData]);

  useEffect(() => {
    getFirebaseBlogs();
  }, []);

  return (
    <div className="updateblog pt-4 pb-3">
      <div className="container">
        <h4 className="text-center">UPDATE YOUR BLOG</h4>
        <div className="row">
          <div className="col-md-12 text-white">
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label className="text-black">Blog Title</Form.Label>
                  <Form.Control
                    name="blogtitle"
                    value={blogtitle}
                    onChange={handleInput}
                    type="text"
                    placeholder="Enter blog title"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                  <Form.Label className="text-black">Blog Category</Form.Label>
                  <Form.Control
                    name="blogcategory"
                    value={blogcategory}
                    onChange={handleInput}
                    type="text"
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPara">
                  <Form.Label className="text-black">About Blog</Form.Label>
                  <Form.Control
                    name="blogpara"
                    value={blogpara}
                    onChange={handleInput}
                    as="textarea"
                    placeholder="Leave a blog para"
                    style={{ height: "150px" }}
                  />
                </Form.Group>
                <Form.Group className="d-none" controlId="formBasicPicture">
                  <Form.Label>Blog Image</Form.Label>
                  <Form.Control
                    name="blogimage"
                    ref={fileInputRef}
                    onChange={handleImage}
                    type="file"
                    placeholder="Enter blog picture"
                  />
                </Form.Group>
                <Form.Group className="" controlId="formBasicImages">
                  <Form.Label className="text-black">Blog Image</Form.Label>
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : blogimage
                    }
                    className="updateimage"
                    alt="update blog image"
                    onClick={() => fileInputRef.current.click()}
                  />
                </Form.Group>
              </div>
              <Button variant="secondary" type="submit">
                {loading ? <ButtonSpinner /> : "Update Blog"}
              </Button>
              <NavLink className={"btn btn-danger ms-2"} to={`/user/blogs`}>
                Cancel
              </NavLink>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
