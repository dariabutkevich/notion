import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

export default function RequireAuth({ children }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.id) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}
