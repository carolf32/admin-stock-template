import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("@TOKEN-ADMIN");

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
