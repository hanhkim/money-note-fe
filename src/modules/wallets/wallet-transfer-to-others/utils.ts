import { IWallet } from '@/models/Wallet.model';
import walletService from '@/services/wallet.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { StringNullableChain } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export interface IWalletTransferMoney {
  fromWalletId: string | null;
  toWalletId: string | null;
  amount: number;
  note?: string;
  date: Date | string;
}

const initialData: IWalletTransferMoney = {
  fromWalletId: null,
  toWalletId: null,
  amount: 0,
  note: '',
  date: new Date(),
};

export const useWalletTransferMoney = (callback?: () => void, selectedWallet?: IWallet | null) => {
  //   console.log('selectedWallet :>> ', selectedWallet);
  const defaultValues = useMemo(() => {
    return selectedWallet ? { ...initialData, fromWalletId: selectedWallet.id } : initialData;
  }, [selectedWallet]);

  const methods = useForm<IWalletTransferMoney>({
    defaultValues: initialData,
  });

  const { handleSubmit, control, reset, setValue } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleClose = () => {
    reset();
    callback?.();
  };

  const { mutateAsync: transferWallet } = useTransferMoney(handleClose);

  const onSubmit = handleSubmit(async (data) => {
    await transferWallet({ ...data, date: dayjs(data.date).format('YYYY-MM-DD') });
  });

  return {
    methods,
    onSubmit,
  };
};

export const useTransferMoney = (callback: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync, data, isPending } = useMutation({
    mutationKey: ['transferMoney'],
    mutationFn: (data: IWalletTransferMoney) => {
      return walletService.transferMoney(data);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ['walletService.getWallets'],
      });
      callback?.();
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  console.log('data :>> ', data);

  return { mutateAsync, isPending };
};
