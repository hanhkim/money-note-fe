import transactionService from "@/services/transaction.service";
import { useQuery } from "@tanstack/react-query";
import { groupBy } from "lodash";
import { ITransaction } from "@/models/Transaction.model";
import {
  ITransactionListStore,
  useTransactionListStore,
} from "./transactionList.store";
import dayjs from "dayjs";

export const useGetTransactions = () => {
  const month = useTransactionListStore(
    (state: ITransactionListStore) => state.month
  );

  const { data, isLoading } = useQuery({
    queryKey: ["transactionService.getTransactions", month],
    queryFn: () =>
      transactionService.getTransactions(month + 1 || dayjs().month()),
    select: (result) => {
      return groupBy(result, "date");
    },
  });

  return { transactionsByDate: data, isLoading };
};
