import FontIcon from "@/components/icon/FontIcon";
import { IWallet } from "@/models/Wallet.model";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React from "react";

interface IWalletItemProps {
  isCreating?: boolean;
  wallet?: IWallet;
  onCreateWallet?: () => void;
  onDelete?: () => void;
}

const WalletItem: React.FC<IWalletItemProps> = ({
  isCreating = false,
  wallet,
  onCreateWallet,
  onDelete,
}) => {
  const content = (
    <DropdownMenu
      aria-label="Dropdown Variants"
      color={"primary"}
      variant={"solid"}
    >
      <DropdownItem key="new">Điều chỉnh số dư</DropdownItem>
      <DropdownItem key="edit">Chỉnh sửa ví</DropdownItem>
      <DropdownItem
        key="delete"
        className="text-danger"
        color="danger"
        onClick={onDelete}
      >
        Xoá ví
      </DropdownItem>
    </DropdownMenu>
  );

  const renderItem = () => {
    return (
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex justify-between items-center w-full">
          <h3>{wallet?.name}</h3>
          <Dropdown>
            <DropdownTrigger>
              <Button
                startContent={<FontIcon type="more_vert" />}
                variant="light"
                isIconOnly
              />
            </DropdownTrigger>
            {content}
          </Dropdown>
        </div>
        <p className="text-3xl">{wallet?.amount || 0}đ</p>
      </div>
    );
  };

  const renderCreateItem = () => {
    return (
      <Button
        color="default"
        startContent={<FontIcon type="add" />}
        variant="light"
        className="w-full h-full text-xl"
        onClick={onCreateWallet}
      >
        Tạo ví
      </Button>
    );
  };

  return (
    <div className="w-[300px] h-[150px] bg-cyan-500 rounded-2xl flex justify-center items-center hover:bg-cyan-600 p-6">
      {isCreating ? renderCreateItem() : renderItem()}
    </div>
  );
};

export default WalletItem;
