import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { NavLink, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { fireDB, firebaseStorage } from "../../../../FirebaseConfig";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../context";
import ButtonSpinner from "../../../Components/ButtonSpinner";
import DataLoader from "../../../Components/DataLoader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ImageProvider } from "../../../Services/ImageProvider";
const UserProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    verified: "",
  });
  const { id } = useParams();
  const ref1 = useRef();
  const { loading, setLoading, getFirebaseData } = useGlobalContext();
  const [objectData, setObjectData] = useState(null);
  const { name, email, address, phone, verified } = formData;
  const [profilePic, setProfilePic] = useState(null);
  const [image, setImage] = useState();
  const getUserProfile = async () => {
    try {
      setLoading(true);
      const docRef = doc(fireDB, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setObjectData(docSnap.data());
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleChecked = (e) => {
    setFormData({ ...formData, verified: e.target.checked });
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name && !email && !address && !phone && !verified) {
      toast.error("All fields are required");
    } else if (!name) {
      toast.error("name is required");
    } else if (!email) {
      toast.error("email is required");
    } else if (!address) {
      toast.error("address is required");
    } else if (!phone) {
      toast.error("phone is required");
    } else if (!verified) {
      toast.error("mark verify required");
    } else {
      try {
        setLoading(true);
        const docRef = doc(fireDB, "users", id);
        await updateDoc(docRef, {
          name,
          address,
          phone,
        });
        getFirebaseData();
        toast.success("profile update successfull");
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.success("something went wrong");
        setLoading(false);
      }
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleImageRef = () => {
    ref1.current.click();
  };

  const uploadPicHandler = async () => {
    try {
      setLoading(true);
      const blogDocRef = doc(fireDB, "users", id);
      if (profilePic instanceof File) {
        const storageRef = ref(firebaseStorage, `blog_images/${id}`);
        await uploadBytes(storageRef, profilePic);
        const imageUrl = await getDownloadURL(storageRef);
        await updateDoc(blogDocRef, {
          profileimage: imageUrl,
        });
        toast.success("profile picture update successfully");
        getFirebaseData();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (objectData) {
      setFormData({
        name: objectData?.name || "",
        email: objectData?.email || "",
        address: objectData?.address || "",
        phone: objectData?.phone || "",
        verified: true,
      });
    }
  }, [objectData]);

  useEffect(() => {
    if (objectData) {
      setImage(objectData.profileimage);
    }
  }, [objectData]);

  useEffect(() => {
    getUserProfile();
  }, []);

  if (loading) {
    return <DataLoader />;
  }
  return (
    <div className="profileWrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="leftdata text-center">
              {image ? (
                <img
                  src={profilePic ? URL.createObjectURL(profilePic) : image}
                  onClick={(e) => handleImageRef(e)}
                  alt="profileimage"
                />
              ) : (
                <img
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : ImageProvider.ProfileLogo
                  }
                  onClick={(e) => handleImageRef(e)}
                  alt="profileimage"
                />
              )}

              <input
                type="file"
                ref={ref1}
                className="form-control d-none"
                onChange={handleImage}
              />
              <h5 className="text-capitalize mt-2 mb-0">{objectData?.name} </h5>
              <span className="d-block">{objectData?.email} </span>
              {profilePic && (
                <button
                  className="btn btn-secondary"
                  onClick={() => uploadPicHandler(objectData)}
                >
                  {loading ? <ButtonSpinner /> : "Upload"}
                </button>
              )}
            </div>
          </div>
          <div className="col-md-8">
            <div className="profileform">
              <h4 className="text-uppercase">Profile Data</h4>
              <div className="rightdata">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleInput}
                      placeholder="Name"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      disabled
                      value={email}
                      onChange={handleInput}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={address}
                      onChange={handleInput}
                      placeholder="Address"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="number"
                      name="phone"
                      value={phone}
                      onChange={handleInput}
                      placeholder="Phone Number"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      checked={verified}
                      onChange={handleChecked}
                      label="Verified"
                    />
                  </Form.Group>
                  <div className="d-flex">
                    <Button variant="secondary" type="submit">
                      {loading ? <ButtonSpinner /> : "Update Profile"}
                    </Button>
                    <NavLink
                      className={"nav-link ms-2"}
                      to={objectData?.name === "admin" ? "/dashboard" : "/"}
                    >
                      <button className="btn btn-dark">Cancel</button>
                    </NavLink>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
