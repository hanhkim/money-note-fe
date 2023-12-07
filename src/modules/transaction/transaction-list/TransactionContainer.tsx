import React from "react";
import TransactionTab from "./TransactionTab";
import { Card, CardBody } from "@nextui-org/react";
import TransactionFooter from "./TransactionFooter";
import { useGetCategoryById } from "./utils";

const TransactionContainer = () => {
  // useGetCategoryById();

  return (
    <div className="p-4">
      <TransactionTab />
      <TransactionFooter />
    </div>
  );
};

export default TransactionContainer;