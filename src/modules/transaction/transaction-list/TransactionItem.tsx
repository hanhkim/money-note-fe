import AmountLabel from '@/components/amount-label/AmountLabel';
import FontIcon from '@/components/icon/FontIcon';
import { FontIconType } from '@/components/icon/fontIconType';
import { ETransactionType } from '@/enums/Transaction.enum';
import { convertNumberToCurrency } from '@/helpers/common.helpers';
import { ITransaction } from '@/models/Transaction.model';
import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

export interface ITransactionItem {
  transaction: ITransaction;
}

const TransactionItem: React.FC<ITransactionItem> = ({ transaction }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        {transaction.category?.icon && (
          <div className="bg-slate-500 rounded-full w-9 h-9 p-1 text-center">
            <FontIcon
              type={transaction.category.icon as FontIconType}
              className="text-white pt-[2px]"
            />
          </div>
        )}
        <div>
          <p className="text-lg">{transaction.category.name}</p>
          <p className="text-xs">{transaction.note}</p>
        </div>
      </div>
      <AmountLabel
        value={transaction.amount}
        className={classNames({
          '!text-green-800':
            transaction.type === ETransactionType.EARNING ||
            (transaction.type === ETransactionType.BORROWED_LENT &&
              ['Thu nợ'.toLowerCase(), 'Đi vay'.toLowerCase()].includes(
                transaction.category?.name?.toLowerCase()
              )),
          '!text-red-500':
            transaction.type === ETransactionType.EXPENSED ||
            (transaction.type === ETransactionType.BORROWED_LENT &&
              ['Cho vay'.toLowerCase(), 'Trả nợ'.toLowerCase()].includes(
                transaction.category?.name?.toLowerCase()
              )),
        })}
      />
    </div>
  );
};

export default TransactionItem;
