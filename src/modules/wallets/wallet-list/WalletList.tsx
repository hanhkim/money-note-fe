"use client";
import React, { useState } from "react";
import WalletItem from "./WalletItem";
import { useGetWalletList } from "@/modules/transaction/transaction-detail/utils";
import { IWallet } from "@/models/Wallet.model";
import WalletModal from "../wallet-detail/WalletModal";
import { useDeleteWallet } from "../wallet-detail/utils";

const WalletList = () => {
  const [isCreateWallet, setIsCreateWallet] = useState(false);
  const { wallets } = useGetWalletList();

  const handleCreateWallet = () => {
    setIsCreateWallet(!isCreateWallet);
  };

  const { handleDeleteWallet } = useDeleteWallet();

  return (
    <>
      <div className="p-4">
        <h2 className="text-slate-500 font-semibold text-2xl mb-4">
          Danh sách ví
        </h2>
        <div className="flex gap-4 flex-wrap basis-4">
          {wallets?.map((wallet: IWallet) => (
            <WalletItem
              key={wallet.id}
              wallet={wallet}
              onDelete={() => handleDeleteWallet(wallet.id as string)}
            />
          ))}

          <WalletItem isCreating onCreateWallet={handleCreateWallet} />
        </div>
      </div>
      <WalletModal
        isOpen={isCreateWallet}
        onClose={() => setIsCreateWallet(false)}
        placement="center"
      />
    </>
  );
};

export default WalletList;
