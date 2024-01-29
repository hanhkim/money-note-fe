import { IWallet } from "@/models/Wallet.model";
import walletService from "@/services/wallet.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const initialData: IWallet = {
  amount: 0,
  id: undefined,
  name: "",
  description: "",
  imgUrl: undefined,
  currencyUnit: "VND",
};

export const useWalletModal = (callback?: () => void) => {
  const methods = useForm<IWallet>({
    defaultValues: initialData,
  });
  const { handleSubmit, control, reset, setValue } = methods;

  const handleClose = () => {
    reset();
    callback?.();
  };

  const { mutateAsync } = useCreateWallet(callback);

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return {
    methods,
    onSubmit,
  };
};

export const useCreateWallet = (callback?: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["walletService.create"],
    mutationFn: (values: IWallet) => walletService.create(values),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["walletService.getWallets"],
      });
      callback?.();
    },
  });

  return {
    mutateAsync,
    isPending,
  };
};

export const useDeleteWallet = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["walletService.delete"],
    mutationFn: (id: string) => walletService.deleteWallet(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["walletService.getWallets"],
      });
    },
  });
  const handleDeleteWallet = useCallback(async (id: string) => {
    if (!id) return;
    await mutateAsync(id);
  }, []);

  return {
    mutateAsync,
    isPending,
    handleDeleteWallet,
  };
};
