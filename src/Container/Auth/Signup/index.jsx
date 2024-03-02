import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputType from "../../Components/shared/InputType";
import { ImageProvider } from "../../Services/ImageProvider";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import "./index.css";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../../FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useGlobalContext } from "../../context";
import ButtonSpinner from "../../Components/ButtonSpinner";
import axios from "axios";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const { loading, setLoading, userData } = useGlobalContext();
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  const { name, email, password, address, phone } = formData;
  const [showPasswordLength, setShowPasswordLength] = useState(false);
  const [validPasswordLength, setValidPasswordLength] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  console.log(userData);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "password" && value.length > 16) {
      return; // Don't update state if password length reaches 16
    }
    if (name === "phone" && value.length > 10) {
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      // Check for password length condition
      if (value.length >= 8 && value.length <= 16) {
        setValidPasswordLength(true);
      } else {
        setValidPasswordLength(false);
      }

      if (/[A-Z]/.test(value)) {
        setHasUpperCase(true);
      } else {
        setHasUpperCase(false);
      }

      if (/[a-z]/.test(value)) {
        setHasLowerCase(true);
      } else {
        setHasLowerCase(false);
      }

      if (/\d/.test(value)) {
        setHasNumber(true);
      } else {
        setHasNumber(false);
      }

      if (/[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]/.test(value)) {
        setHasSpecialChar(true);
      } else {
        setHasSpecialChar(false);
      }

      if (
        value.length >= 8 &&
        value.length <= 16 &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /\d/.test(value) &&
        /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-]/.test(value)
      ) {
        setShowPasswordLength(false); // Set showPasswordLength to false when all conditions are met
      } else {
        setShowPasswordLength(true);
      }
    }
    // Check if the field value is empty, then show the error
    if (value.trim() === "") {
      setErrors({
        ...errors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`,
      });
    } else {
      // Clear the error if the field is not empty
      setErrors({ ...errors, [name]: "" });
    }
  };

  const onPasswordFocus = () => {
    setShowPasswordLength(true);
  };

  const onPasswordBlur = () => {
    setShowPasswordLength(false);
  };

  const setRealData = async (data) => {
    try {
      const res = await axios.post(
        "https://projectone-a8a72-default-rtdb.firebaseio.com/realtimeuserdata.json",
        data
      );
    } catch (error) {
      console.error("Error in setRealData:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    // Basic validation - check for empty fields
    if (name.trim() === "") {
      newErrors = { ...newErrors, name: "Name is required" };
    }
    if (email.trim() === "") {
      newErrors = { ...newErrors, email: "Email is required" };
    }
    if (password.trim() === "") {
      newErrors = { ...newErrors, password: "Password is required" };
    }
    if (address.trim() === "") {
      newErrors = { ...newErrors, address: "Address is required" };
    }
    if (phone.trim() === "") {
      newErrors = { ...newErrors, phone: "Phone is required" };
    }

    // Update errors state to display error messages and change border color
    setErrors(newErrors);
    // If there are no errors, you can proceed with form submission
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const users = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = {
          name: name,
          uid: users.user.uid,
          email: users.user.email,
          address: address,
          phone: phone,
          time: Timestamp.now(),
          status: "inactive",
        };

        const readSignupData = {
          name: name,
          uid: users?.user?.uid,
          message: "new user Registered",
          readstatus: false,
          time: Timestamp.now(),
        };
        const userRef = collection(fireDB, "users");
        await addDoc(userRef, user);
        if (userRef) {
          setRealData(readSignupData);
        }
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
        });
        toast.success("registration successfull");
        navigate("/login");
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        setLoading(false);
      }
    } else {
      if (!errors) {
        toast.error("Something went wrong");
      }
    }
  };

  if (userData?.authObject?.email === "admin@gmail.com") {
    return <Navigate to="/dashboard" />;
  } else if (!userData?.authObject?.email === "admin@gmail.com") {
    return <Navigate to="/" />;
  }

  return (
    <div className="signupWrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 signupImageSection p-0 m-0">
            <img
              src={ImageProvider.SignupImage}
              alt="signupImage"
              height={"100%"}
              width={"100%"}
              className="image_border_radius"
            />
            <div className="logo_data">
              <NavLink to={"/"}>
                <img
                  src={ImageProvider.WebLogo}
                  alt="signuplogo"
                  className="weblogologin"
                />
              </NavLink>
            </div>
          </div>
          <div className="col-md-5 formWrapper">
            <h3>Registration Form</h3>
            <Form onSubmit={handleSubmit}>
              <InputType
                controlId="basicName"
                inputlable="Name"
                inputtype="text"
                placeholder="Enter name"
                name="name"
                value={name}
                onchange={handleInput}
                error={errors.name}
              />
              {errors.name ? <p className="text-danger">{errors.name} </p> : ""}
              <InputType
                controlId="basicEmail"
                inputlable="Email address"
                inputtype="email"
                placeholder="Enter email"
                name="email"
                value={email}
                error={errors.email}
                onchange={handleInput}
              />
              {errors.email ? (
                <p className="text-danger">{errors.email} </p>
              ) : (
                ""
              )}
              <div className="password_field">
                <InputType
                  controlId="basicPassword"
                  inputlable="Password"
                  error={errors.password}
                  inputtype="password"
                  onfocus={onPasswordFocus}
                  onblur={onPasswordBlur}
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onchange={handleInput}
                  showEyeIcon={showEyeIcon}
                />
                <div className="eye_icon">
                  {!showEyeIcon ? (
                    <span
                      className="icons"
                      onClick={() => setShowEyeIcon(!showEyeIcon)}
                    >
                      <FaEyeSlash />
                    </span>
                  ) : (
                    <span
                      className="icons"
                      onClick={() => setShowEyeIcon(!showEyeIcon)}
                    >
                      <FaEye />
                    </span>
                  )}
                </div>
              </div>
              {errors.password ? (
                <p className="text-danger">{errors.password} </p>
              ) : (
                ""
              )}

              {!errors.password && showPasswordLength && (
                <div className="password_notify">
                  <div
                    className={`d-flex ${
                      validPasswordLength ? "text-success" : "text-danger"
                    }`}
                  >
                    {validPasswordLength ? (
                      <span>
                        <FaCheckCircle />
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="ms-2">
                      Password must be min 8 and max should be 16 char{" "}
                    </span>
                  </div>
                  <div
                    className={`d-flex ${
                      hasUpperCase ? "text-success" : "text-danger"
                    }`}
                  >
                    {hasUpperCase ? (
                      <span>
                        <FaCheckCircle />
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="ms-2">
                      Password should be Atleast 1 uppercase
                    </span>
                  </div>
                  <div
                    className={`d-flex ${
                      hasLowerCase ? "text-success" : "text-danger"
                    }`}
                  >
                    {hasLowerCase ? (
                      <span>
                        <FaCheckCircle />{" "}
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="ms-2">
                      Password should be Atleast 1 lowercase{" "}
                    </span>
                  </div>
                  <div
                    className={`d-flex ${
                      hasNumber ? "text-success" : "text-danger"
                    }`}
                  >
                    {hasNumber ? (
                      <span>
                        <FaCheckCircle />{" "}
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="ms-2">
                      Password should be Atleast 1 number{" "}
                    </span>
                  </div>
                  <div
                    className={`d-flex ${
                      hasSpecialChar ? "text-success" : "text-danger"
                    }`}
                  >
                    {hasSpecialChar ? (
                      <span>
                        <FaCheckCircle />{" "}
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="ms-2">
                      Password should be Atleast 1 special character{" "}
                    </span>
                  </div>
                </div>
              )}

              <InputType
                controlId="basicAddress"
                inputlable="Address"
                error={errors.address}
                inputtype="text"
                placeholder="Enter Address"
                name="address"
                value={address}
                onchange={handleInput}
              />
              {errors.address ? (
                <p className="text-danger">{errors.address} </p>
              ) : (
                ""
              )}
              <InputType
                controlId="basicPhone"
                inputlable="Phone Number"
                error={errors.phone}
                inputtype="number"
                placeholder="Enter Phone"
                name="phone"
                value={phone}
                onchange={handleInput}
              />
              {errors.phone ? (
                <p className="text-danger">{errors.phone} </p>
              ) : (
                ""
              )}
              <button className="btn btn-success w-100">
                {loading ? <ButtonSpinner /> : "Sinup"}
              </button>
            </Form>
            <div className="d-flex justify-content-between mt-3">
              <span>Already have an account?</span>
              <Link className="nav-link" to="/login">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
