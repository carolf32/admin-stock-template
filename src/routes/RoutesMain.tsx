import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/Homepage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

const RoutesMain = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default RoutesMain;
