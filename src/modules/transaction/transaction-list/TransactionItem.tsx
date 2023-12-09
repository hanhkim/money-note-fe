import { ITransaction } from "@/models/Transaction.model";
import Image from "next/image";
import React from "react";

export interface ITransactionItem {
  transaction: ITransaction;
}

const TransactionItem: React.FC<ITransactionItem> = ({ transaction }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <Image
          src="/images/eating.png"
          alt="category-img"
          width={50}
          height={50}
        />
        <span>{transaction.categoryId}</span>
      </div>
      <div className="text-[red]">{`-${transaction.amount}`}</div>
    </div>
  );
};

export default TransactionItem;
