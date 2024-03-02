import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import "./index.css";
import { useGlobalContext } from "../../context";
import RealTimeNotification from "../../Components/RealTimeNotification";
import { ImageProvider } from "../../Services/ImageProvider";
const Header = ({ weblogo, burgermenu, togelHandler }) => {
  const { userData, getFirebaseData, allUsers } = useGlobalContext();
  const username = userData?.authObject?.name;
  const useruid = userData?.authObject?.id;
  const filterProfileData = allUsers.find((profile) => profile.id === useruid);
  useEffect(() => {
    getFirebaseData();
  }, []);
  return (
    <Navbar expand="lg" className="bg-body-tertiary custumnavbar">
      <div className="container-fluid">
        <Navbar.Brand>
          {username === "admin" ? (
            <span onClick={() => togelHandler()} className="cursor">
              {burgermenu}
            </span>
          ) : (
            <img src={weblogo} alt="logo" className="logo" />
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {!userData && (
              <>
                <Nav.Link to="/login" as={NavLink}>
                  LOGIN
                </Nav.Link>
                <Nav.Link to="/signup" as={NavLink}>
                  SIGNUP
                </Nav.Link>
              </>
            )}
            {username === "admin" ? (
              <NavLink className="nav-link" to="/admin/notification">
                <RealTimeNotification />
              </NavLink>
            ) : (
              <>
                <Nav.Link to="/" as={NavLink}>
                  HOME
                </Nav.Link>
                <Nav.Link to="/blogs" as={NavLink}>
                  BLOGS
                </Nav.Link>
              </>
            )}

            {userData ? (
              <span className="text-uppercase">
                welcome {filterProfileData?.name}
              </span>
            ) : (
              ""
            )}
            {userData && (
              <NavDropdown
                id="basic-nav-dropdown"
                title={
                  <span>
                    <img
                      src={
                        filterProfileData?.profileimage
                          ? filterProfileData.profileimage
                          : ImageProvider.ProfileLogo
                      }
                      alt="profileLogo"
                      className="profilelogo"
                    />
                  </span>
                }
              >
                <NavDropdown.Item to={`/user/profile/${useruid}`} as={NavLink}>
                  <ImProfile />
                  <span className="ms-2">Profile</span>
                </NavDropdown.Item>
                <NavDropdown.Item to="/logout" as={NavLink}>
                  <AiOutlineLogout />
                  <span className="ms-2">Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
