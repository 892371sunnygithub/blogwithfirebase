import React, { useEffect } from "react";
import { FaBell } from "react-icons/fa";
import "./index.css";
import { useGlobalContext } from "../../context";
const RealTimeNotification = () => {
  const { realData, getRealtimeData } = useGlobalContext();
  useEffect(() => {
    getRealtimeData();
  }, []);
  return (
    <div className="realtimenotification">
      <FaBell className="bellicon" />
      {realData.length > 0 && (
        <span className="notifylength">{realData.length} </span>
      )}
    </div>
  );
};

export default RealTimeNotification;
