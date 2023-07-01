import { Navigate, Outlet } from "react-router-dom";

const AuthedRoute = ({ user }: any) => {
  return user?.isValid ? <Outlet /> : <Navigate to='/login' />;
};

export default AuthedRoute;
