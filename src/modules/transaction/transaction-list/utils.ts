import transactionService from "@/services/transaction.service";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { groupBy } from "lodash";
import { ITransaction } from "@/models/Transaction.model";

export const useGetTransactions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["transactionService.getTransactions"],
    queryFn: () => transactionService.getTransactions(),
    select: (result) => {
      return groupBy(result, "date");
    },
  });

  console.log("data :>> ", data);

  return { transactionsByDate: data, isLoading };
};
