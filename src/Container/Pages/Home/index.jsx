import React, { useEffect } from "react";
import HeroSection from "../../Components/herosection";
import BlogCategory from "../../Components/blogcategory";
import BlogServices from "../../Components/blogservices";
import GetStarted from "../../Components/GetStarted";
import AboutBlog from "../../Components/AboutBlog";
import Testimonial from "../../Components/Testimonial";
import { useGlobalContext } from "../../context";
import { Navigate } from "react-router-dom";
import SpeedWrite from "../../Components/SpeedWrite";
const Home = () => {
  const { userData } = useGlobalContext();
  if (userData?.authObject?.email === "admin@gmail.com") {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="homeWrapper">
      {userData ? (
        <GetStarted />
      ) : (
        <>
          <HeroSection />
          <AboutBlog />
          <BlogCategory />
          <BlogServices />
          <Testimonial />
          <SpeedWrite />
        </>
      )}
    </div>
  );
};

export default Home;
