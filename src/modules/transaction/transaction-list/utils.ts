import transactionService from "@/services/transaction.service";
import { useQuery } from "@tanstack/react-query";
import { groupBy } from "lodash";
import { ITransaction } from "@/models/Transaction.model";
import {
  ITransactionListStore,
  useTransactionListStore,
} from "./transactionList.store";
import dayjs from "dayjs";
import { select } from "@nextui-org/theme";

export const useGetTransactions = () => {
  const { month, selectedWalletId } = useTransactionListStore(
    (state: ITransactionListStore) => ({
      month: state.month,
      selectedWalletId: state.selectedWalletId,
    })
  );

  const { data, isLoading } = useQuery({
    queryKey: ["transactionService.getTransactions", month, selectedWalletId],
    queryFn: () =>
      transactionService.getTransactions({
        month: month + 1 || dayjs().month(),
        walletId: selectedWalletId as string | undefined,
      }),
    select: (result) => {
      return groupBy(result, "date");
    },
  });

  return { transactionsByDate: data, isLoading };
};
