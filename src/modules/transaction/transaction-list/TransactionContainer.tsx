import React from "react";
import TransactionTab from "./TransactionTab";
import TransactionFooter from "./TransactionFooter";

const TransactionContainer = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className="h-full">
      <TransactionTab />
      <TransactionFooter isMobile={isMobile} />
    </div>
  );
};

export default TransactionContainer;
