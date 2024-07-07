import FontIcon from "@/components/icon/FontIcon";
import { IWallet } from "@/models/Wallet.model";
import {
  Button,
  Card,
  CardBody,
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
  onEditWallet?: () => void;
}

const WalletItem: React.FC<IWalletItemProps> = ({
  isCreating = false,
  wallet,
  onCreateWallet,
  onDelete,
  onEditWallet,
}) => {
  const content = (
    <DropdownMenu
      aria-label="Dropdown Variants"
      color={"primary"}
      variant={"solid"}
    >
      <DropdownItem key="new">Điều chỉnh số dư</DropdownItem>
      <DropdownItem key="edit" onClick={onEditWallet}>
        Chỉnh sửa ví
      </DropdownItem>
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
      <Card className="w-full">
        <CardBody>
          <div className="flex gap-4 items-center">
            <FontIcon type={"wallet"} className="text-5xl" />
            <div className="flex flex-col justify-between w-full h-full">
              <div className="flex justify-between items-center w-full">
                <h5>{wallet?.name}</h5>
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
              <p className="text-xl">{wallet?.amount || 0}đ</p>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  };

  const renderCreateItem = () => {
    return (
      <Button
        color="success"
        startContent={<FontIcon type="add" />}
        variant="bordered"
        onClick={onCreateWallet}
      >
        Tạo ví
      </Button>
    );
  };

  return (
    <div className="sm:w-[300px] w-full h-[100px] rounded-2xl flex justify-center items-center">
      {isCreating ? renderCreateItem() : renderItem()}
    </div>
  );
};

export default WalletItem;
