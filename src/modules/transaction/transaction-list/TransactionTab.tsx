"use client";
import React, { useMemo } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TransactionList from "./TransactionList";

const TransactionTab = () => {
  const tabItems = useMemo(() => {
    return [
      {
        key: "october",
        title: "October",
        children: <div>No transaction</div>,
      },
      {
        key: "november",
        title: "November",
        children: <TransactionList />,
      },
      {
        key: "december",
        title: "December",
        children: <div>Hello</div>,
      },
    ];
  }, []);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        className="flex justify-center"
        fullWidth
        size="lg"
        color="primary"
        variant="solid"
        defaultSelectedKey={"november"}
      >
        {tabItems.map((item) => (
          <Tab key={item.key} title={item.title}>
            {item.children}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default TransactionTab;
