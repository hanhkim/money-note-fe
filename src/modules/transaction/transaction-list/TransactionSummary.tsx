import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { convertNumberToCurrency } from "@/helpers/common.helpers";
import {
  ITransactionListStore,
  useTransactionListStore,
} from "./transactionList.store";
import {
  useGetDetailTransaction,
  useGetDetailWallet,
} from "../transaction-detail/utils";
import AmountLabel from "@/components/amount-label/AmountLabel";

const TransactionSummary = () => {
  const { selectedWalletId } = useTransactionListStore(
    (state: ITransactionListStore) => ({
      selectedWalletId: state.selectedWalletId,
    })
  );

  const { data: selectedWallet } = useGetDetailWallet(
    selectedWalletId as string
  );

  const items = useMemo(
    () => [
      {
        text: "Total income",
        value: selectedWallet?.totalIncome,
      },
      {
        text: "Total expense",
        value: selectedWallet?.totalExpense,
      },
      {
        text: "Total balance",
        value: selectedWallet?.amount,
      },
      {
        text: "Transfer to other wallet",
        value: selectedWallet?.transferAmount,
      },
      {
        text: "Get money from other wallet",
        value: selectedWallet?.receiveAmount,
      },
      // {
      //   text: "Begin of month",
      //   value: convertNumberToCurrency(0),
      // },
      // {
      //   text: "End of month",
      //   value: convertNumberToCurrency(0),
      // },
    ],
    [
      selectedWallet?.amount,
      selectedWallet?.receiveAmount,
      selectedWallet?.totalExpense,
      selectedWallet?.totalIncome,
      selectedWallet?.transferAmount,
    ]
  );

  return (
    <div className="px-3">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between gap-0">
          <div className="text-neutral-500 text-sm">{item.text}</div>
          <AmountLabel value={item.value || 0} />
          {/* <div className="text-neutral-700 italic text-sm">{item.value}</div> */}
        </div>
      ))}
    </div>
  );
};

export default TransactionSummary;
