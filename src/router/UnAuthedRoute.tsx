import { Navigate, Outlet } from "react-router-dom";

const UnAuthedRoute = ({ user }: any) => {
  return !user?.isValid ? <Outlet /> : <Navigate to='/recess-shop/' />;
};

export default UnAuthedRoute;
