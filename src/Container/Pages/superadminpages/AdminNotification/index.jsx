import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context";
import { formateDate } from "../../../Services/Helper";
import Paginate from "../../../Components/Paginate";
import { Badge } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AdminNotification = () => {
  const { realData, getRealtimeData, setRealData } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = realData
    ? realData?.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const RealHeader = ["S.no", "Name", "Message", "Date", "Status"];
  const markReadHandler = async (id) => {
    if (
      window.confirm(
        "Have you read it? Do you want to remove this notification?"
      )
    ) {
      const realtimeDatabaseUrl =
        "https://projectone-a8a72-default-rtdb.firebaseio.com";
      const endpoint = `/realtimeuserdata/${id}.json`;
      try {
        await axios.delete(realtimeDatabaseUrl + endpoint);
        setRealData((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success("read successfully");
      } catch (error) {
        console.error("Error marking as read and deleting:", error.message);
      }
    }
  };
  useEffect(() => {
    getRealtimeData();
  }, []);
  return (
    <div className="realDataWrapper">
      <h4 className="mb-0">USERS INFORMATION </h4>
      <div className="tableData">
        <table className="table table-responsive">
          <thead>
            <tr>
              {RealHeader.map((curElm, index) => (
                <th key={index}>{curElm} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((curElm, index) => (
              <tr key={index}>
                <td>{index + 1} </td>
                <td>{curElm.name} </td>
                <td>{curElm.message} </td>
                <td>{formateDate(curElm.time)} </td>
                <td>
                  <Badge
                    bg={curElm.readstatus ? "success" : "danger"}
                    onClick={() => markReadHandler(curElm.id)}
                  >
                    {curElm.readstatus ? "Mark Read" : "Unread"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination_data">
        <Paginate
          itemsPerPage={itemsPerPage}
          totalItems={realData?.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AdminNotification;
