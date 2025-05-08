import React from "react";
import { Outlet } from "react-router";

import { Header, Sidebar } from "../../../components";
import "./root.styles.css";
import { useBreakpoint } from "../../../hooks";

const Root: React.FC = () => {
  const { isMobile } = useBreakpoint();

  return (
    <div className={`root-container ${isMobile ? "mobile" : "desktop"}`}>
      <Header />
      <Sidebar />
      <div className="outlet-container h-[90vh] overflow-y-auto pb-5 px-5 md:pb-10 md:px-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
