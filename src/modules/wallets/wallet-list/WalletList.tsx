'use client';
import React, { use, useEffect, useState } from 'react';
import WalletItem from './WalletItem';
import { useGetWalletList } from '@/modules/transaction/transaction-detail/utils';
import { IWallet } from '@/models/Wallet.model';
import WalletModal from '../wallet-detail/WalletModal';
import { useDeleteWallet, useSetDefaultWallet } from '../wallet-detail/utils';
import { useMyProfile } from '@/hooks/useMyProfile';
import WalletTransferToOther from '../wallet-transfer-to-others/WalletTransferToOther';

const WalletList = () => {
  const [isCreateWallet, setIsCreateWallet] = useState(false);
  const { wallets } = useGetWalletList();
  const [selectedWallet, setSelectedWallet] = useState<IWallet | null>(null);
  const [isOpenTransferMoney, setIsOpenTransferMoney] = useState(false);

  const handleCreateWallet = () => {
    setIsCreateWallet(!isCreateWallet);
  };

  const { handleDeleteWallet } = useDeleteWallet();

  const { mutateAsync: setDefaultWallet } = useSetDefaultWallet();

  const myProfile = useMyProfile();

  useEffect(() => {
    if (!myProfile || (myProfile && myProfile.defaultWallet)) return;
    setIsCreateWallet(true);
  }, [myProfile]);

  const handleEditWallet = (wallet: IWallet) => {
    setSelectedWallet(wallet);
    setIsCreateWallet(true);
  };

  const handleTransferMoney = (wallet: IWallet) => {
    setSelectedWallet(wallet);
    setIsOpenTransferMoney(true);
  };

  const handleSetDefaultWallet = async (wallet: IWallet) => {
    await setDefaultWallet(wallet.id as string);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-slate-500 font-semibold text-2xl mb-4">Danh sách ví</h2>
        <div className="flex gap-4 flex-wrap basis-4">
          {wallets?.map((wallet: IWallet) => (
            <WalletItem
              key={wallet.id}
              wallet={wallet}
              onDelete={() => handleDeleteWallet(wallet.id as string)}
              onEditWallet={() => {
                handleEditWallet(wallet);
              }}
              onSetDefault={() => handleSetDefaultWallet(wallet)}
              onTransferMoney={() => handleTransferMoney(wallet)}
            />
          ))}

          <WalletItem isCreating onCreateWallet={handleCreateWallet} />
        </div>
      </div>
      <WalletModal
        isOpen={isCreateWallet}
        onClose={() => {
          setIsCreateWallet(false);
          setSelectedWallet(null);
        }}
        placement="center"
        selectedWallet={selectedWallet}
      />
      <WalletTransferToOther
        isOpen={isOpenTransferMoney}
        onClose={() => {
          setIsOpenTransferMoney(false);
        }}
        selectedWallet={selectedWallet}
      />
    </>
  );
};

export default WalletList;
