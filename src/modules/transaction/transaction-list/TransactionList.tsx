import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Chip,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import TransactionItem from "./TransactionItem";
import { useGetTransactions } from "./utils";
import { ITransaction } from "@/models/Transaction.model";
import { sumBy } from "lodash";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import {
  ITransactionDetailStore,
  ITransactionListStore,
  useTransactionDetailStore,
  useTransactionListStore,
} from "./transactionList.store";
import { useGetDetailTransaction } from "../transaction-detail/utils";
import EmptyData from "@/components/empty-data/EmptyData";
import { ETransactionType } from "@/enums/Transaction.enum";
import classNames from "classnames";
import { sum } from "lodash";

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
});

const TransactionList = () => {
  const { transactionsByDate = {} } = useGetTransactions();
  const { month } = useTransactionListStore((state: ITransactionListStore) => ({
    setMonth: state.setMonth,
    month: state.month,
  }));

  const transactionData = useMemo(
    () => Object.entries(transactionsByDate),
    [transactionsByDate]
  );

  return (
    <div className="">
      <div className="flex flex-col gap-4 p-2">
        {transactionData?.length > 0 ? (
          transactionData.map(([date, transactions]) => (
            <TransactionBlock
              transactions={transactions as ITransaction[]}
              date={date}
              key={date}
            />
          ))
        ) : (
          <EmptyData
            text={`You have not had any transactions in ${dayjs()
              .month(month)
              .format("MMMM")}.\n Add transactions to track your expenses`}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionList;

export interface ITransactionBlock {
  transactions: ITransaction[];
  date: string;
}

export const TransactionBlock: React.FC<ITransactionBlock> = ({
  transactions,
  date,
}) => {
  const setSelectedTransactionId = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.setSelectedTransactionId
  );
  const setOpenTransactionModal = useTransactionDetailStore(
    (state: ITransactionDetailStore) => state.setOpenTransactionModal
  );

  useGetDetailTransaction();

  const handleClickItem = (transaction: ITransaction) => {
    setSelectedTransactionId(transaction.id);
    setOpenTransactionModal(true);
  };

  return (
    <Card className="p-2 border-none" isFooterBlurred shadow="sm" radius="sm">
      <CardHeader className="flex justify-between px-0 py-2">
        <TransactionDateHeader transactions={transactions} date={date} />
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 p-2 px-0 py-0">
        <Listbox color="default" variant="faded">
          {transactions?.map((transaction: ITransaction) => (
            <ListboxItem
              key={transaction.id}
              onClick={() => handleClickItem(transaction)}
            >
              <TransactionItem transaction={transaction} />
            </ListboxItem>
          ))}
        </Listbox>
      </CardBody>
    </Card>
  );
};

export const TransactionDateHeader: React.FC<{
  transactions: ITransaction[];
  date: string;
}> = ({ transactions, date }) => {
  const sumAmount = transactions.reduce(
    (sum: number, currentT: ITransaction) => {
      if (currentT.type === ETransactionType.EARNING) {
        return sum + Number(currentT.amount);
      } else if (currentT.type === ETransactionType.EXPENSED) {
        return sum - Number(currentT.amount);
      }
      return sum;
    },
    0
  );

  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="text-3xl text-slate-500">{dayjs(date).format("D")}</div>
        <div>
          <div className="text-base">{dayjs(date).format("MMMM, YYYY")}</div>
          <div>
            <Chip variant="bordered" size="sm">
              {dayjs(date).format("dddd")}
            </Chip>
          </div>
        </div>
      </div>
      <div
        className={classNames({
          "text-[red]": sumAmount < 0,
          "text-[green]": sumAmount > 0,
        })}
      >
        {sumAmount || "-"}
      </div>
    </>
  );
};
