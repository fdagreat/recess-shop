import { Navigate, Outlet } from "react-router-dom";

const AuthedRoute = ({ user }: any) => {
  return user?.isValid ? <Outlet /> : <Navigate to='/recess-shop/login' />;
};

export default AuthedRoute;
