import Sidebar from "../../Common/Sidebar";
import Header from "../../Common/Header";
import { GiHamburgerMenu } from "react-icons/gi";
import Footer from "../../Common/Footer";
import "./index.css";
import { useState } from "react";
const AdminLayout = ({ children }) => {
  const [togelMenu, setTogelMenu] = useState(false);
  const togelHandler = () => {
    setTogelMenu(!togelMenu);
  };
  return (
    <div className="adminLayoutWrapper">
      <aside className={`${togelMenu ? "sidebarTogel" : ""}`}>
        <Sidebar setTogelMenu={setTogelMenu} togelMenu={togelMenu} />
      </aside>
      <div className={`innerData ${togelMenu ? "togelInner" : ""}`}>
        <header>
          <Header
            burgermenu={<GiHamburgerMenu />}
            togelHandler={togelHandler}
          />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
