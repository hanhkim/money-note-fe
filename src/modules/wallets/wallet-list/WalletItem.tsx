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
import classNames from "classnames";
import React from "react";

interface IWalletItemProps {
  isCreating?: boolean;
  wallet?: IWallet;
  onCreateWallet?: () => void;
  onDelete?: () => void;
  onEditWallet?: () => void;
  onSetDefault?: () => void;
}

const WalletItem: React.FC<IWalletItemProps> = ({
  isCreating = false,
  wallet,
  onCreateWallet,
  onDelete,
  onEditWallet,
  onSetDefault,
}) => {
  const isDefaultWallet = wallet?.isDefault;
  console.log("isDefaultWallet :>> ", isDefaultWallet);

  const content = (
    <DropdownMenu
      aria-label="Dropdown Variants"
      color={"primary"}
      variant={"solid"}
      disabledKeys={
        isDefaultWallet ? ["set-default", "transfer", "delete"] : []
      }
    >
      <DropdownItem key="edit" onClick={onEditWallet}>
        Chỉnh sửa ví
      </DropdownItem>
      <DropdownItem key="set-default" onClick={onSetDefault}>
        Làm mặc định
      </DropdownItem>
      <DropdownItem key="transfer">Chuyển sang ví khác</DropdownItem>
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
      <Card
        className={classNames("w-full", {
          "bg-[#f0f8ff]": isDefaultWallet,
          "bg-[#f0f8ff] border border-primary": isDefaultWallet,
        })}
      >
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
