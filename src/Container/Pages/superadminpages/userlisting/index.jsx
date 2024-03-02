import React, { useEffect, useState } from "react";
import TableHead from "./tablehead";
import "./index.css";
import { useGlobalContext } from "../../../context";
import { formateDate } from "../../../Services/Helper";
import { Badge } from "react-bootstrap";
import { fireDB } from "../../../../FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Paginate from "../../../Components/Paginate";
import { ImageProvider } from "../../../Services/ImageProvider";
const UserListing = () => {
  const { allUsers, getFirebaseData } = useGlobalContext();
  const filterData = allUsers.filter((curElm) => curElm.name !== "admin");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData
    ? filterData?.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const statusUpdateHandler = async (curElm) => {
    if (window.confirm("are you sure want to update this user status")) {
      const newStatus = curElm?.status === "active" ? "inactive" : "active";
      const collectionRef = doc(fireDB, "users", curElm.id);
      await updateDoc(collectionRef, { status: newStatus });
      toast.success("status updated successfull");
      getFirebaseData();
    }
  };
  useEffect(() => {
    getFirebaseData();
  }, []);

  return (
    <div className="userlisting">
      <h4 className="mb-0">USER LISTING </h4>
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
                <tr key={index + 1 + indexOfFirstItem}>
                  <td>{index + 1} </td>
                  <td>
                    <img
                      src={
                        curElm.profileimage
                          ? curElm.profileimage
                          : ImageProvider.ProfileLogo
                      }
                      alt=""
                      className="table_image"
                    />{" "}
                  </td>
                  <td>{curElm.name} </td>
                  <td>{curElm.email} </td>
                  <td>{curElm.phone} </td>
                  <td>{curElm.address} </td>
                  <td>{formateDate(curElm.time)} </td>
                  <td>
                    <Badge
                      className="cursor"
                      bg={curElm.status === "active" ? "success" : "danger"}
                      onClick={() => statusUpdateHandler(curElm)}
                    >
                      {curElm.status}
                    </Badge>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={TableHead.length}>No users found </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination_data">
          <Paginate
            itemsPerPage={itemsPerPage}
            totalItems={filterData?.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserListing;
