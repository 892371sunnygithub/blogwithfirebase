import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaListOl } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import "./index.css";
import { ImageProvider } from "../../Services/ImageProvider";
const Sidebar = ({ setTogelMenu }) => {
  return (
    <div className="sidebarWrapper">
      <div className="sidebarlogo">
        <img src={ImageProvider.WebLogo} alt="sidebarLogo" className="logo" />
      </div>
      <ul className="p-0">
        <li className="list_item" onClick={() => setTogelMenu(false)}>
          <NavLink
            to={"/dashboard"}
            className={"nav-link d-flex align-items-center"}
          >
            <MdDashboardCustomize /> <span className="ms-3">Dashboard</span>
          </NavLink>
        </li>
        <li className="list_item" onClick={() => setTogelMenu(false)}>
          <NavLink
            to={"/admin/users"}
            className={"nav-link d-flex align-items-center"}
          >
            <FaListOl />
            <span className="ms-3"> Users Listing</span>
          </NavLink>
        </li>
        <li className="list_item" onClick={() => setTogelMenu(false)}>
          <NavLink
            to={"/admin/bloger/list"}
            className={"nav-link d-flex align-items-center"}
          >
            <FaMoneyCheckDollar /> <span className="ms-3">Blogers</span>
          </NavLink>
        </li>

        <li className="list_item" onClick={() => setTogelMenu(false)}>
          <NavLink
            to={"/admin/notification"}
            className={"nav-link d-flex align-items-center"}
          >
            <FaMoneyCheckDollar /> <span className="ms-3">Notification</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
