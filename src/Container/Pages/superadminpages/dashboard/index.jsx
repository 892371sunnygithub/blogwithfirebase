import React from "react";
const Dashboard = ({ children }) => {
  return (
    <div className="dashBoardWrapper pt-3 pb-3">
      <div className="container-fluid">{children}</div>
    </div>
  );
};

export default Dashboard;
