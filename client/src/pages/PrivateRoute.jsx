import { Navigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../context/context";

const PrivateRoute = ({ children }) => {
  const { loginUser } = useContext(Context);
  return loginUser ? children : <Navigate to="/"></Navigate>;
};

export default PrivateRoute;
