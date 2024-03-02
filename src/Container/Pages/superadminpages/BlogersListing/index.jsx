import React, { useEffect, useState } from "react";
import "./index.css";
import { useGlobalContext } from "../../../context";
import { Badge } from "react-bootstrap";
import Paginate from "../../../Components/Paginate";
import { ImageProvider } from "../../../Services/ImageProvider";
const BlogersListing = () => {
  const { blogs, getFirebaseBlogs } = useGlobalContext();
  const uniqueArray = Array.from(new Set(blogs.map((item) => item.userid))).map(
    (userid) => {
      return blogs.find((item) => item.userid === userid);
    }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = uniqueArray
    ? uniqueArray?.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const TableHead = ["Sno", "User Name", "User Email", "Category", "Status"];
  useEffect(() => {
    getFirebaseBlogs();
  }, []);

  return (
    <div className="userlisting">
      <h4 className="mb-0">BLOGERS LISTING </h4>
      <div className="tabledata">
        <table className="table table-responsive">
          <thead>
            <tr>
              {TableHead.map((curElm, index) => (
                <th key={index}>{curElm} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.length > 0 ? (
              currentItems.map((curElm, index) => (
                <tr key={index}>
                  <td>{index + 1} </td>
                  <td>
                    <img
                      src={
                        curElm.userprofile
                          ? curElm.userprofile
                          : ImageProvider.ProfileLogo
                      }
                      alt="userprofile"
                      className="table_image"
                    />{" "}
                  </td>
                  <td>{curElm.username} </td>
                  <td>{curElm.useremail} </td>
                  <td>{curElm.blogtitle} </td>
                  <td>
                    <Badge bg={"success"}>active </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TableHead.length}>No bloger found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination_data">
          <Paginate
            itemsPerPage={itemsPerPage}
            totalItems={uniqueArray?.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogersListing;
