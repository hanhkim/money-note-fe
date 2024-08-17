import React, { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Header } from ".";
import Footerbar from "./Footerbar";
import classNames from "classnames";

const Layout = ({
  children,
  isMobile,
}: {
  children?: ReactNode;
  isMobile?: boolean;
}) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      {!isMobile && <Sidebar />}
      <div className="flex-1">
        {/* <Header /> */}
        <div
          className={classNames({
            "h-[calc(100vh-65px)]": !isMobile,
            "h-[calc(100%-57px)]": isMobile,
          })}
        >
          {children}
        </div>
        {isMobile && <Footerbar />}
      </div>
    </div>
  );
};

export default Layout;
