"use client";
// import { headers } from "next/headers";
import { headers } from "next/headers";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import FontIcon from "@/components/icon/FontIcon";
import { TransactionModal } from "../transaction-detail";

const TransactionFooter = ({ isMobile }: { isMobile: boolean }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="fixed bottom-[64px] left-0 p-4 rounded w-full">
        <div className="text-center ">
          <Button
            color="primary"
            className="rounded-full"
            startContent={<FontIcon type="add" />}
            onClick={() => setOpenModal(true)}
            isIconOnly={isMobile}
          >
            {isMobile ? "" : "Add transaction"}
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
