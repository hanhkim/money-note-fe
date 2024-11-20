'use client';
import React, { useMemo } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from '@nextui-org/react';
import InputField from '@/components/field/InputField';
import FieldSection from '@/components/field-section/FieldSection';
import SelectField from '@/components/field/SelectField';
import TextareaField from '@/components/field/TextareaField';
import DatePickerField from '@/components/field/DatePickerField';
import { isMobile } from 'react-device-detect';
import { useGetWalletList } from '@/modules/transaction/transaction-detail/utils';
import { IWallet } from '@/models/Wallet.model';
import { useWalletTransferMoney } from './utils';
import { FormProvider } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';

interface ITransactionModal {
  isOpen: boolean;
  onClose?: () => void;
  selectedWallet: IWallet | null;
}

const WalletTransferToOther: React.FC<ITransactionModal> = ({
  isOpen,
  selectedWallet,
  onClose,
}) => {
  const { wallets } = useGetWalletList();
  const { methods, onSubmit } = useWalletTransferMoney(onClose, selectedWallet);
  const { control, watch } = methods;
  const fromWalletId = watch('fromWalletId');

  const fromWalletOptions = useMemo(() => {
    return wallets?.map((w: any) => ({ value: w.id, label: w.name }));
  }, [wallets]);

  const toWalletOptions = useMemo(() => {
    return wallets?.map((w: any) => ({
      value: w.id,
      label: w.name,
      disabled: w.id === fromWalletId,
    }));
  }, [fromWalletId, wallets]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement={'auto'}
        onClose={onClose}
        size={isMobile ? 'full' : '2xl'}
        className="h-full"
        isDismissable
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                  <ModalHeader className="flex flex-col gap-1 border-b-1 border-[#dedede]">
                    <div className="grid grid-cols-6">
                      <Button
                        color="default"
                        variant="light"
                        onPress={onClose}
                        className="justify-start p-0 col-span-1"
                      >
                        Cancel
                      </Button>
                      <div className="justify-center items-center text-primary col-span-4 text-center flex">
                        Record
                      </div>
                      <div className="col-span-1">
                        <Button color="success" type="submit" variant="light">
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
                            name="fromWalletId"
                            control={control}
                            options={fromWalletOptions}
                            placeholder="Choose wallet"
                          />
                        }
                      />
                      <FieldSection
                        title="To wallet"
                        component={
                          <SelectField
                            name="toWalletId"
                            control={control}
                            options={toWalletOptions}
                            placeholder="Choose wallet"
                            disabledKeys={[fromWalletId]}
                          />
                        }
                      />
                      <FieldSection
                        title="Amount of money"
                        component={
                          <InputField
                            name="amount"
                            control={control}
                            type="number"
                            placeholder="0.00"
                            labelPlacement="outside"
                            size="sm"
                            classNames={{
                              mainWrapper: 'h-12',
                              innerWrapper: 'h-12',
                              inputWrapper: 'h-12',
                              input: 'h-12 text-base',
                            }}
                            endContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">VND</span>
                              </div>
                            }
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
                            size="sm"
                          />
                        }
                      />
                      <FieldSection
                        title="Date"
                        component={<DatePickerField name="date" control={control} />}
                      />
                    </div>
                  </ModalBody>
                </form>
              </FormProvider>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster />
    </>
  );
};

export default WalletTransferToOther;
