import { ITransaction } from "@/models/Transaction.model";
import categoryService from "@/services/category.service";
import transactionService from "@/services/transaction.service";
import walletService from "@/services/wallet.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategoryList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryList"],
    queryFn: () => categoryService.getCategories(),
    retry: 3,
    select: (result) => {
      return result?.map((r: any) => ({ ...r, value: r.id, label: r.name }));
    },
  });

  return { categories: data || [], isLoading };
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, data, isPending } = useMutation({
    mutationKey: ["addTransaction"],
    mutationFn: (data: ITransaction) => transactionService.addTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactionService.getTransactions"],
      });
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
