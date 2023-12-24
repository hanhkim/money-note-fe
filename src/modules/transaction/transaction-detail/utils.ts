import { ETransactionType } from "@/enums/Transaction.enum";
import { ITransaction, ITransactionForm } from "@/models/Transaction.model";
import categoryService from "@/services/category.service";
import transactionService from "@/services/transaction.service";
import walletService from "@/services/wallet.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import {
  ITransactionDetailStore,
  useTransactionDetailStore,
} from "../transaction-list/transactionList.store";
import { shallow } from "zustand/shallow";
import { get } from "lodash";
import { useEffect } from "react";

const initialData: ITransactionForm = {
  amount: 0,
  categoryId: null,
  note: "",
  date: dayjs().toDate(),
  toWhom: "",
  img: null,
  walletId: null,
  type: ETransactionType.EXPENSED,
};

export const useTransactionModal = (callback: () => void) => {
  const detailTransaction = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.detailTransaction
  );
  const { handleSubmit, control, reset, setValue } = useForm<ITransactionForm>({
    defaultValues: initialData,
  });

  const handleClose = () => {
    reset();
    callback?.();
  };

  useEffect(() => {
    reset(detailTransaction || initialData);

    return () => {
      reset(initialData);
    };
  }, [detailTransaction, reset]);

  const { mutateAsync } = useAddTransaction(handleClose);

  const onSubmit = handleSubmit(async (data: ITransactionForm) => {
    console.log("data >> ", data);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "date") {
        formData.append(key, dayjs(value).format("YYYY-MM-DD"));
      } else {
        formData.append(key, value);
      }
    });
    console.log("formData :>> ", formData.values());

    await mutateAsync(formData);
  });

  return {
    onSubmit,
    control,
    reset,
    setValue,
  };
};

export const useGetCategoryList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryList"],
    queryFn: () => categoryService.getCategories({ type: "expensed" }),
    retry: 3,
    select: (result) => {
      return result?.map((r: any) => ({ ...r, value: r.id, label: r.name }));
    },
  });

  return { categories: data || [], isLoading };
};

export const useAddTransaction = (callback: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync, data, isPending } = useMutation({
    mutationKey: ["addTransaction"],
    mutationFn: (data: any) => transactionService.addTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactionService.getTransactions"],
      });
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
    queryKey: ["walletService.getWallets"],
    queryFn: () => walletService.getWallets(),
    retry: 3,
    initialData: [],
  });

  return { wallets: data, isLoading };
};

export const useGetDetailTransaction = () => {
  const selectedTransactionId = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.selectedTransactionId
  );
  const setDetailTransaction = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.setDetailTransaction
  );

  return useQuery<ITransaction>({
    queryKey: ["transactionService.getTransaction", selectedTransactionId],
    queryFn: () =>
      transactionService.getTransaction(selectedTransactionId as string),
    enabled: !!selectedTransactionId,
    select: (result: any) => {
      setDetailTransaction(result);
      return result;
    },
  });
};
