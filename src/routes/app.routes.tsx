import { v4 as uuid } from "uuid";
import { FaHourglassStart } from "react-icons/fa";
import { createBrowserRouter, RouterProvider } from "react-router";
import { SiGoogletagmanager } from "react-icons/si";

import Operations from "../pages/app/operations";
import Root from "../pages/app/root";
import { useCallback } from "react";
import Example from "../pages/app/example";

const router = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Operations />,
        title: "Operações",
        icon: <SiGoogletagmanager />,
        isSidebarMenuItem: true,
      },
      {
        path: "/example",
        element: <Example />,
        title: "Exemplo",
        icon: <FaHourglassStart />,
        isSidebarMenuItem: true,
      },
    ],
  },
];

export const getSidebarMenuItems = () => {
  return router[0].children
    .filter((route) => route.isSidebarMenuItem)
    .map(({ isSidebarMenuItem, ...route }) => ({
      id: uuid(),
      ...route,
    }));
};

const AppRoutes = () => {
  const getRoutes = useCallback(() => {
    return router.map((route) => ({
      ...route,
      children: route.children.map((childRoute) => ({
        path: childRoute.path,
        element: childRoute.element,
      })),
    }));
  }, []);

  return <RouterProvider router={createBrowserRouter(getRoutes())} />;
};

export default AppRoutes;
