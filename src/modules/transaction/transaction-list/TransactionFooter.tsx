"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import FontIcon from "@/components/icon/FontIcon";
import { TransactionModal } from "../transaction-detail";

const TransactionFooter = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className=" p-4 rounded  shadow-lg w-full">
        <div className="text-center">
          <Button
            color="primary"
            className="rounded-full"
            startContent={<FontIcon type="add" />}
            onClick={() => setOpenModal(true)}
          >
            Add transaction
          </Button>
        </div>
      </div>
      <TransactionModal
        isOpen={openModal}
        placement="auto"
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default TransactionFooter;
