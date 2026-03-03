import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading hot aahe re...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace/>;
  }

  return children;
};

export default Protected;
