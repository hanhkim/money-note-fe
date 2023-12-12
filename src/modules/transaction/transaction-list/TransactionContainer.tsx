import React from "react";
import TransactionTab from "./TransactionTab";
import { Card, CardBody } from "@nextui-org/react";
import TransactionFooter from "./TransactionFooter";

const TransactionContainer = () => {
  return (
    <div className="p-4 h-full">
      <TransactionTab />
      <TransactionFooter />
    </div>
  );
};

export default TransactionContainer;
