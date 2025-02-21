import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/FakeAuthContext";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/", { replace: true });
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedRoutes;
