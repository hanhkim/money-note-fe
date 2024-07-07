"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import FontIcon from "../icon/FontIcon";
import { Image } from "@nextui-org/image";
import { FontIconType } from "../icon/fontIconType";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth.service";

const menuItems = [
  { id: 1, label: "Transactions", icon: "paid", link: "/transactions" },
  { id: 2, label: "Wallets", icon: "account_balance_wallet", link: "/wallets" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(true);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const { mutateAsync: logout, error } = useMutation({
    mutationKey: ["authService.logout"],
    mutationFn: () => authService.logout(),
    onSuccess: async (result) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.push("/login");
    },
    onError: (error) => {
      alert(error);
    },
  });

  const pathname = usePathname();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === pathname),
    [pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col bg-white shadow-[0_3px_7px_0_rgba(0,0,0,.27)] z-[100]",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
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

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const handleClickLogout = async () => {
    await logout();
  };
  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex flex-col items-start">
          <div className="w-full flex mb-2">
            <Dropdown placement="right">
              <DropdownTrigger>
                <User
                  as="button"
                  name={toggleCollapse ? "" : "User name"}
                  className="transition-transform"
                  avatarProps={{
                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">
                  <p className="font-bold">User name</p>
                  <p className="text-sm">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="copy" onClick={handleClickLogout}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {menuItems.map(({ icon, ...menu }, index) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={index}>
                <Link href={menu.link}>
                  <div className="flex gap-2 p-3">
                    <span className="flex">
                      <FontIcon type={icon as FontIconType} />
                    </span>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between fixed bottom-10">
          <div
            className="flex items-center pl-1 cursor-pointer"
            onClick={handleSidebarToggle}
          >
            <FontIcon
              type={
                toggleCollapse
                  ? "keyboard_double_arrow_right"
                  : "keyboard_double_arrow_left"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
