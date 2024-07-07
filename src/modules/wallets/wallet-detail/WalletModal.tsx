"use client";
import React, { useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalProps,
} from "@nextui-org/react";
import InputField from "@/components/field/InputField";
import FieldSection from "@/components/field-section/FieldSection";
import { FormProvider, useForm } from "react-hook-form";
import FontIcon from "@/components/icon/FontIcon";
import { useWalletModal } from "./utils";
import { useMyProfile } from "@/hooks/useMyProfile";
import { Toaster } from "react-hot-toast";
import { IWallet } from "@/models/Wallet.model";

interface IWalletModal {
  isOpen: boolean;
  placement: ModalProps["placement"];
  onClose?: () => void;
  selectedWallet: IWallet | null;
}

const WalletModal: React.FC<IWalletModal> = ({
  isOpen,
  placement,
  onClose,
  selectedWallet,
}) => {
  const { defaultWallet: myDefaultWallet } = useMyProfile() || {};
  const { methods, onSubmit } = useWalletModal(
    onClose,
    myDefaultWallet,
    selectedWallet
  );
  const { control } = methods;

  return (
    <Modal isOpen={isOpen} placement={placement} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {myDefaultWallet
                  ? "Create/Edit Wallet"
                  : "Create your first wallet"}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <FieldSection
                    title="Name"
                    component={
                      <InputField
                        name="name"
                        control={control}
                        placeholder="Nhập tên ví"
                        labelPlacement="outside"
                        size="lg"
                        startContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              <FontIcon type="wallet" />
                            </span>
                          </div>
                        }
                      />
                    }
                  />
                  <FieldSection
                    title="Money type"
                    component={
                      <InputField
                        name="currencyUnit"
                        control={control}
                        placeholder="VND"
                        fullWidth
                        size="sm"
                        disabled
                      />
                    }
                  />
                  <FieldSection
                    title="Amount"
                    component={
                      <InputField
                        name="amount"
                        control={control}
                        placeholder="Enter your current amount"
                        fullWidth
                        size="sm"
                      />
                    }
                  />
                  <FieldSection
                    title="Description"
                    component={
                      <InputField
                        name="description"
                        control={control}
                        placeholder="Enter your description"
                        fullWidth
                        size="sm"
                      />
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Save
                </Button>
              </ModalFooter>
              <Toaster />
            </form>
          </FormProvider>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
