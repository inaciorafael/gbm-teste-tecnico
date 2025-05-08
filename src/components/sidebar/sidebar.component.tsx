import React, { useCallback } from "react";
import { IoExitOutline } from "react-icons/io5";

import "./sidebar.styles.css";
import { getSidebarMenuItems } from "../../routes/app.routes";
import { useLocation, useNavigate } from "react-router";
import useStore from "../../store";

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { handleLogout } = useStore();

  const isActiveRoute = useCallback(
    (routePath: string) => pathname === routePath,
    [pathname],
  );

  const handleNavigateToPath = (path: string) => {
    navigate(path);
  };

  return (
    <div className="sidebar-container justify-between flex flex-col gap-5 p-5 bg-[var(--sidebar-background)]">
      <div className="flex flex-col gap-3">
        <img
          src="https://www.gbmtech.com.br/gbm-logo.svg"
          className="w-[120px]"
        />
        <div className="flex flex-col gap-3 mt-5">
          {getSidebarMenuItems().map((route) => (
            <button
              key={route.id}
              onClick={() => handleNavigateToPath(route.path)}
              style={{
                backgroundColor: isActiveRoute(route.path) ? "#3787ff" : "",
                color: isActiveRoute(route.path) ? "white" : "#222",
              }}
              className="flex flex-row items-center gap-2 text-white font-semibold px-3 py-1 rounded-xl"
            >
              {route.icon}
              {route.title}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={handleLogout}
          className="hover:bg-gray-100 text-gray-800 flex flex-row items-center gap-2 transition-all w-full rounded-xl py-1 px-3"
        >
          <IoExitOutline className="text-xl" />
          Sair
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
