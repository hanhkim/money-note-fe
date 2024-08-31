import AmountLabel from "@/components/amount-label/AmountLabel";
import FontIcon from "@/components/icon/FontIcon";
import { FontIconType } from "@/components/icon/fontIconType";
import { ETransactionType } from "@/enums/Transaction.enum";
import { convertNumberToCurrency } from "@/helpers/common.helpers";
import { ITransaction } from "@/models/Transaction.model";
import classNames from "classnames";
import Image from "next/image";
import React from "react";

export interface ITransactionItem {
  transaction: ITransaction;
}

const TransactionItem: React.FC<ITransactionItem> = ({ transaction }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        {transaction.category?.icon && (
          <FontIcon
            type={transaction.category.icon as FontIconType}
            className="text-sky-300 w-[50px] h-[50px] text-[46px]"
          />
        )}
        <div>
          <p className="text-lg">{transaction.category.name}</p>
          <p className="text-xs">{transaction.note}</p>
        </div>
      </div>
      <AmountLabel
        value={transaction.amount}
        className={
          transaction.type === ETransactionType.EXPENSED
            ? "!text-red-500"
            : "!text-green-800"
        }
      />
    </div>
  );
};

export default TransactionItem;
