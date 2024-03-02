import React from "react";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { ImageProvider } from "../../Services/ImageProvider";
import "./index.css";
const UserLayout = ({ children }) => {
  return (
    <div className="userLayoutWrapper">
      <header>
        <Header weblogo={ImageProvider.WebLogo} />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
