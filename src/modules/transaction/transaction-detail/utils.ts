import { ETransactionType } from '@/enums/Transaction.enum';
import { ICategory, ITransaction, ITransactionForm } from '@/models/Transaction.model';
import categoryService from '@/services/category.service';
import transactionService from '@/services/transaction.service';
import walletService from '@/services/wallet.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import groupBy from 'lodash/groupBy';
import { useForm, useWatch } from 'react-hook-form';
import {
  ITransactionDetailStore,
  ITransactionListStore,
  useTransactionDetailStore,
  useTransactionListStore,
} from '../transaction-list/transactionList.store';
import { useEffect, useMemo } from 'react';
import { useMyProfile } from '@/hooks/useMyProfile';

const initialData: ITransactionForm = {
  amount: 0,
  categoryId: null,
  note: '',
  date: dayjs().toDate(),
  toWhom: '',
  img: null,
  walletId: null,
  type: ETransactionType.EXPENSED,
};

export const useTransactionModal = (callback: () => void) => {
  const data = useMyProfile();
  const { defaultWallet } = data || {};
  const selectedTransactionId = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.selectedTransactionId
  );
  const detailTransaction = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.detailTransaction
  );
  const { selectedWalletId } = useTransactionListStore((state: ITransactionListStore) => ({
    selectedWalletId: state.selectedWalletId,
  }));

  const defaultValues = useMemo(() => {
    return {
      ...initialData,
      walletId: selectedWalletId || defaultWallet?.id,
    };
  }, [defaultWallet?.id, selectedWalletId]);

  const { handleSubmit, control, reset, setValue, watch } = useForm<ITransactionForm>({
    defaultValues,
  });

  const walletId = watch('walletId');

  const queryClient = useQueryClient();

  const handleClose = () => {
    reset();
    callback?.();
    queryClient.invalidateQueries({
      queryKey: ['walletService.getWallet', walletId],
    });
  };

  useEffect(() => {
    reset(detailTransaction || defaultValues);

    return () => {
      reset(initialData);
    };
  }, [defaultValues, detailTransaction, reset]);

  const { mutateAsync } = useAddTransaction(handleClose);

  const { mutateAsync: handleDelete } = useDeleteTransaction(handleClose);

  const onSubmit = handleSubmit(async (data: ITransactionForm) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'date') {
        formData.append(key, dayjs(value).format('YYYY-MM-DD'));
      } else {
        formData.append(key, value);
      }
    });

    await mutateAsync(formData);
  });

  const handleDeleteTransaction = async () => {
    if (!selectedTransactionId) return;
    await handleDelete(selectedTransactionId);
  };

  return {
    onSubmit,
    control,
    reset,
    setValue,
    watch,
    handleDeleteTransaction,
  };
};

export const useGetCategoryList = (type: ETransactionType = ETransactionType.EXPENSED) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getCategoryList'],
    queryFn: () => categoryService.getCategories({ type }),
    retry: 3,
    select: (result) => {
      return result?.map((r: any) => ({ ...r, value: r.id, label: r.name }));
    },
    staleTime: 10 * 60 * 60,
  });

  const categorizedTransactions = useMemo(() => {
    let expensedCategories: ICategory[] = [],
      earnedCategories: ICategory[] = [],
      borrowedLentCategories: ICategory[] = [];

    (data || []).forEach((category: any) => {
      if (category.type === ETransactionType.EXPENSED) expensedCategories.push(category);
      else if (category.type === ETransactionType.EARNING) earnedCategories.push(category);
      else borrowedLentCategories.push(category);
    });

    return {
      list: {
        [ETransactionType.EXPENSED]: expensedCategories,
        [ETransactionType.EARNING]: earnedCategories,
        [ETransactionType.BORROWED_LENT]: borrowedLentCategories,
      },
      groupedList: {
        [ETransactionType.EXPENSED]: groupBy(
          expensedCategories,
          (category: any) => category.parentId
        ),
        [ETransactionType.EARNING]: groupBy(earnedCategories, (category: any) => category.parentId),
        [ETransactionType.BORROWED_LENT]: groupBy(
          borrowedLentCategories,
          (category: any) => category.parentId
        ),
      },
    };
  }, [data]);

  return {
    categories: data || [],
    expensedCategories: categorizedTransactions.list[ETransactionType.EXPENSED],
    earnedCategories: categorizedTransactions.list[ETransactionType.EARNING],
    borrowedLentCategories: categorizedTransactions.list[ETransactionType.BORROWED_LENT],
    groupedList: categorizedTransactions.groupedList,
    categorizedTransactions,
    isLoading,
  };
};

export const useAddTransaction = (callback: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync, data, isPending } = useMutation({
    mutationKey: ['addTransaction'],
    mutationFn: (data: any) => {
      console.log('mutationFn data :>> ', data.get('id'));

      if (data.get('id')) {
        return transactionService.editTransaction(data);
      }
      return transactionService.addTransaction(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transactionService.getTransactions'],
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["walletService.getWallets"],
      // });
      callback?.();
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};

export const useGetWalletList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['walletService.getWallets'],
    queryFn: () => walletService.getWallets(),
    retry: 3,
    initialData: [],
  });

  return { wallets: data, isLoading };
};

export const useGetDetailWallet = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['walletService.getWallet', id],
    queryFn: () => walletService.getWallet(id),
    retry: 3,
    enabled: !!id,
    // initialData: {},
  });

  const walletDefailt = useMemo(() => data, [data]);

  return { data: walletDefailt, isLoading };
};

export const useGetDetailTransaction = () => {
  const selectedTransactionId = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.selectedTransactionId
  );
  const setDetailTransaction = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.setDetailTransaction
  );

  return useQuery<ITransaction>({
    queryKey: ['transactionService.getTransaction', selectedTransactionId],
    queryFn: () => transactionService.getTransaction(selectedTransactionId as string),
    enabled: !!selectedTransactionId,
    select: (result: any) => {
      setDetailTransaction(result);
      return result;
    },
  });
};

export const useDeleteTransaction = (callback: () => void) => {
  const queryClient = useQueryClient();
  const selectedTransactionId = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.selectedTransactionId
  );

  const { mutateAsync, data, isPending } = useMutation({
    mutationKey: ['addTransaction', selectedTransactionId],
    mutationFn: (id: string) => {
      return transactionService.deleteTransaction(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['transactionService.getTransactions'],
      });
      callback?.();
    },
  });

  return { mutateAsync, isPending };
};
