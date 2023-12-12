import React from "react";
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
  ITransactionListStore,
  useTransactionListStore,
} from "./transactionList.store";
import { pick } from "lodash";

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

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {Object.entries(transactionsByDate)?.map(([date, transactions]) => (
          <TransactionBlock
            transactions={transactions as ITransaction[]}
            date={date}
            key={date}
          />
        ))}
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
  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between">
        <TransactionDateHeader transactions={transactions} date={date} />
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4">
        <Listbox color="default" variant="faded">
          {transactions?.map((transaction: ITransaction) => (
            <ListboxItem key={transaction.id}>
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
  const sumAmount = sumBy(transactions, "amount");

  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="text-xl text-slate-500">{dayjs(date).format("D")}</div>
        <div>
          <div className="text-base">{dayjs(date).format("MMMM, YYYY")}</div>
          <div>
            <Chip variant="bordered" size="sm">
              {dayjs(date).format("dddd")}
            </Chip>
          </div>
        </div>
      </div>
      <div className="text-[red]">{sumAmount || "-"}</div>
    </>
  );
};
