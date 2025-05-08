import React from "react";
import { IoExitOutline } from "react-icons/io5";
import { PiBellRinging } from "react-icons/pi";
import { MdOutlineMailOutline } from "react-icons/md";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import { Avatar } from "../../components";
import "./header.styles.css";
import { useBreakpoint } from "../../hooks";
import useStore from "../../store";

dayjs.locale("pt-br");

const Header: React.FC = () => {
  const { user, handleLogout } = useStore();
  const { isMobile } = useBreakpoint();

  return (
    <div className="px-5 md:px-10 bg-[var(--page-background)] header-container flex justify-between flex-row items-center py-2 w-full">
      <div>
        {isMobile ? (
          <img
            src="https://www.gbmtech.com.br/gbm-logo.svg"
            className="w-[90px]"
          />
        ) : null}
      </div>

      <div className="flex flex-row items-center gap-5">
        <div className="flex flex-row items-center gap-3">
          <Avatar />
          <div className="flex flex-col">
            {!isMobile ? (
              <>
                <span>{user.email}</span>
                <span className="text-[0.8rem] text-gray-400">
                  {dayjs().format("dddd DD MMM, YYYY")}
                </span>
              </>
            ) : null}
          </div>

        </div>

        {isMobile ? (
          <button
            onClick={handleLogout}
            className="hover:bg-gray-100 text-gray-800 flex flex-row items-center transition-all rounded-xl"
          >
            <IoExitOutline className="text-2xl" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
