"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import FontIcon from "../icon/FontIcon";
import { FontIconType } from "../icon/fontIconType";
import { useRouter } from "next/router";

const menuItems = [
  { id: 1, label: "Transactions", icon: "paid", link: "/transactions" },
  { id: 2, label: "Wallets", icon: "account_balance_wallet", link: "/wallets" },
  {
    id: 4,
    label: "Analytics",
    icon: "analytics",
    link: "/",
  },
  {
    id: 5,
    label: "Account",
    icon: "account_circle",
    link: "/account",
  },
];

const Footerbar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const pathname = usePathname();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "px-2 flex justify-between shadow-[0_3px_7px_0_rgba(0,0,0,.27)] z-[10] w-full fixed bg-white fixed bottom-0"
  );

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
    >
      {menuItems.map(({ icon, ...menu }, index) => {
        return (
          <div key={index}>
            <Link
              href={menu.link}
              className={classNames({ "text-[red]": true })}
            >
              <div
                className={classNames(
                  "flex flex-col items-center p-1 text-slate-500",
                  { "!text-primary": menu.id === activeMenu?.id }
                )}
              >
                <div>
                  <FontIcon type={icon as FontIconType} className="text-2xl" />
                </div>
                <p className={classNames("text-[10px]")}>{menu.label}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Footerbar;
