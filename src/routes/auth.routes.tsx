import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "../pages/auth/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

const AuthRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AuthRoutes;
