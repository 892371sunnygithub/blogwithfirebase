import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context";
const ProtectedRoute = ({ children }) => {
  const { userData } = useGlobalContext();
  if (!userData) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
