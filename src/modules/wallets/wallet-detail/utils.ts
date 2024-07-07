import { useGetProfile } from "@/hooks/useGetProfile";
import { IWallet } from "@/models/Wallet.model";
import walletService from "@/services/wallet.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const initialData: IWallet = {
  amount: 0,
  id: undefined,
  name: "",
  description: "",
  imgUrl: undefined,
  currencyUnit: "VND",
};

export const useWalletModal = (
  callback?: () => void,
  myDefaultWallet?: IWallet | undefined | null,
  selectedWallet?: IWallet | null
) => {
  const defaultValues = useMemo(() => {
    return selectedWallet ? selectedWallet : initialData;
  }, [selectedWallet]);

  const methods = useForm<IWallet>({
    defaultValues: defaultValues,
  });
  const { handleSubmit, control, reset, setValue } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  const handleClose = () => {
    reset();
    callback?.();
  };

  const { mutateAsync: createWallet } = useCreateWallet(
    handleClose,
    myDefaultWallet
  );

  const { mutateAsync: updateWallet } = useUpdateWallet(handleClose);

  const onSubmit = handleSubmit(async (data) => {
    await (data.id ? updateWallet(data) : createWallet(data));
  });

  return {
    methods,
    onSubmit,
  };
};

export const useCreateWallet = (
  callback?: () => void,
  myDefaultWallet?: IWallet | undefined | null
) => {
  const queryClient = useQueryClient();

  const { mutateAsync: setDefaultWallet } = useSetDefaultWallet();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["walletService.create"],
    mutationFn: (values: IWallet) => walletService.create(values),
    onSuccess: async (result) => {
      console.log("result :>> ", result);
      if (!myDefaultWallet) {
        // set Default wallet
        await setDefaultWallet(result.id as string);
      }
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

export const useSetDefaultWallet = () => {
  const { getProfile } = useGetProfile();

  return useMutation({
    mutationKey: ["walletService.setDefaultWallet"],
    mutationFn: (id: string) => walletService.setDefaultWallet(id),
    onSuccess: async (result) => {
      console.log("result :>> ", result);
      // set Default wallet

      await getProfile();
    },
  });
};

export const useUpdateWallet = (callback?: () => void) => {
  const queryClient = useQueryClient();

  const { mutateAsync: setDefaultWallet } = useSetDefaultWallet();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["walletService.update"],
    mutationFn: (values: IWallet) => walletService.update(values),
    onSuccess: async (result) => {
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
