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
  useTransactionDetailStore,
} from "../transaction-list/transactionList.store";
import RadioGroupField from "@/components/field/RadioGroupField";

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
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Transaction
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
                  <div className="w-full bg-slate-100 p-2">
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
                        startContent={
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
                    {/* <InputField
                      name="img"
                      control={control}
                      placeholder="Enter your img"
                      fullWidth
                      size="sm"
                      type="file"
                      onChange={handleChangeFile}
                    /> */}
                    <input type="file" onChange={handleChangeFile} />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <div>
                  <Button
                    color="danger"
                    onPress={() => handleDeleteTransaction()}
                  >
                    Delete
                  </Button>
                </div>

                <div>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={handleClickCancel}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Save
                  </Button>
                </div>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
