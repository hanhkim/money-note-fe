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
  Divider,
} from "@nextui-org/react";
import InputField from "@/components/field/InputField";
import FieldSection from "@/components/field-section/FieldSection";
import SelectField from "@/components/field/SelectField";
import TextareaField from "@/components/field/TextareaField";
import DatePickerField from "@/components/field/DatePickerField";
import {
  useGetCategoryList,
  useGetWalletList,
  useTransactionModal,
} from "./utils";
import {
  ITransactionDetailStore,
  ITransactionListStore,
  useTransactionDetailStore,
  useTransactionListStore,
} from "../transaction-list/transactionList.store";
import RadioGroupField from "@/components/field/RadioGroupField";
import { isMobile } from "react-device-detect";
import { useGetProfile } from "@/hooks/useGetProfile";
import FontIcon from "@/components/icon/FontIcon";

interface ITransactionModal {
  isOpen: boolean;
  placement: ModalProps["placement"];
  onClose?: () => void;
}

const TransactionModal: React.FC<ITransactionModal> = ({
  isOpen,
  placement,
  onClose,
}) => {
  const { wallets } = useGetWalletList();

  const openTransactionModal = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.openTransactionModal
  );
  const setOpenTransactionModal = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.setOpenTransactionModal
  );
  const setDetailTransaction = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.setDetailTransaction
  );

  const walletOptions = useMemo(() => {
    return wallets?.map((w: any) => ({ value: w.id, label: w.name }));
  }, [wallets]);

  const handleClose = () => {
    setOpenTransactionModal(false);
    onClose?.();
    setDetailTransaction(null);
  };

  const { onSubmit, control, reset, setValue, watch, handleDeleteTransaction } =
    useTransactionModal(handleClose);

  const type = watch("type");

  const { categories } = useGetCategoryList(type);

  const handleClickCancel = () => {
    handleClose();
    reset();
  };

  const isOpenModal = openTransactionModal || isOpen;

  const handleChangeFile = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      console.log("event.target :>> ", event.target.files);
      const i = event.target.files[0];
      setValue("img", i);
    } else {
      setValue("img", null);
    }
  };

  return (
    <Modal
      isOpen={isOpenModal}
      placement={placement}
      onClose={handleClickCancel}
      size={isMobile ? "full" : "2xl"}
      // scrollBehavior="outside"
      className="h-full"
      isDismissable
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1 border-b-1 border-[#dedede]">
                <div className="grid grid-cols-6">
                  <Button
                    color="default"
                    variant="light"
                    onPress={handleClickCancel}
                    className="justify-start p-0 col-span-1"
                  >
                    Cancel
                  </Button>
                  <div className="justify-center items-center text-primary col-span-4 text-center flex">
                    Record
                  </div>
                  <div className="col-span-1">
                    <Button
                      color="success"
                      type="submit"
                      variant="light"
                      // className="justify-start p-0"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <FieldSection
                    title="From wallet"
                    component={
                      <SelectField
                        name="walletId"
                        control={control}
                        options={walletOptions}
                        placeholder="Choose wallet"
                      />
                    }
                  />
                  <div className="w-full p-0">
                    <RadioGroupField name="type" control={control} />
                  </div>
                  <FieldSection
                    title="Price"
                    component={
                      <InputField
                        name="amount"
                        control={control}
                        type="number"
                        placeholder="0.00"
                        labelPlacement="outside"
                        size="lg"
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              VND
                            </span>
                          </div>
                        }
                      />
                    }
                  />
                  <FieldSection
                    title="Category"
                    component={
                      <SelectField
                        name="categoryId"
                        control={control}
                        options={categories}
                      />
                    }
                  />
                  <FieldSection
                    title="Notes"
                    component={
                      <TextareaField
                        name="note"
                        control={control}
                        placeholder="Enter your description"
                        fullWidth
                      />
                    }
                  />

                  <FieldSection
                    title="Date"
                    component={
                      <DatePickerField name="date" control={control} />
                    }
                  />
                  <FieldSection
                    title="For person"
                    component={
                      <InputField
                        name="toWhom"
                        control={control}
                        placeholder="Enter your description"
                        fullWidth
                        size="sm"
                      />
                    }
                  />
                  <div>
                    <input type="file" onChange={handleChangeFile} />
                  </div>
                </div>
                <Divider className="mt-4" />
                <div className="mt-2 text-right">
                  <Button
                    color="danger"
                    onPress={() => handleDeleteTransaction()}
                    variant="light"
                    startContent={
                      <FontIcon type="delete" className="text-base" />
                    }
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </ModalBody>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
