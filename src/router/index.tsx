import { RouterProvider, createBrowserRouter } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ErrorPage from "../pages/error page";
import Home from "../pages/home";
import LoginPage from "../pages/login";
import ProductDetails from "../pages/product details";
import Register from "../pages/register";
import Root from "../pages/root";
import UnAuthedRoute from "./UnAuthedRoute";
import AuthedRoute from "./AuthedRoute";
import CartPage from "../pages/cart";

const AppRouter = () => {
  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/recess-shop",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "recess-shop/products",
          element: <Home />,
        },
        {
          path: "recess-shop/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "recess-shop/cart",
          element: <CartPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <UnAuthedRoute user={user} />,
      children: [
        {
          path: "/auth/login",
          element: <LoginPage />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
