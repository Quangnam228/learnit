import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
const Auth = () => {
  //   const navigate = useNavigate();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default Auth;
