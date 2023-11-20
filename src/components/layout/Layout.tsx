import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Header } from ".";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="flex-1 text-white">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
