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
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "@/components/field/InputField";
import FieldSection from "@/components/field-section/FieldSection";
import SelectField from "@/components/field/SelectField";
import TextareaField from "@/components/field/TextareaField";
import DatePickerField from "@/components/field/DatePickerField";
import {
  useAddTransaction,
  useGetCategoryList,
  useGetWalletList,
} from "./utils";
import { ITransaction } from "@/models/Transaction.model";

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
  const { categories } = useGetCategoryList();
  const { wallets } = useGetWalletList();

  const walletOptions = useMemo(() => {
    return wallets.map((w: any) => ({ value: w.id, label: w.name }));
  }, [wallets]);

  const { mutateAsync } = useAddTransaction();

  const { handleSubmit, control } = useForm<ITransaction>();

  const onSubmit: SubmitHandler<ITransaction> = async (data: ITransaction) => {
    await mutateAsync(data);
  };

  return (
    <Modal isOpen={isOpen} placement={placement} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                Transaction
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
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
                    title="From wallet"
                    component={
                      <SelectField
                        name="walletId"
                        control={control}
                        options={walletOptions}
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
                    <p>Attaches</p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose} type="submit">
                  Save
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default TransactionModal;
