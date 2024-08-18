"use client";
import React, { useMemo, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Select,
  SelectItem,
} from "@nextui-org/react";
import TransactionList from "./TransactionList";
import {
  ITransactionListStore,
  useTransactionListStore,
} from "./transactionList.store";
import FontIcon from "@/components/icon/FontIcon";
import dayjs from "dayjs";
import TransactionSummary from "./TransactionSummary";
import { useGetWalletList } from "../transaction-detail/utils";
import { useMyProfile } from "@/hooks/useMyProfile";

const TransactionTab = () => {
  const [year, setYear] = useState(dayjs().year());

  const { setMonth, month } = useTransactionListStore(
    (state: ITransactionListStore) => ({
      setMonth: state.setMonth,
      month: state.month,
    })
  );

  const getNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
    }
    const nextMonth = dayjs()
      .startOf("month")
      .month(month)
      .add(1, "month")
      .month();

    setMonth(nextMonth);
  };

  const getPreviousMonth = () => {
    if (month === 0) {
      setYear(year - 1);
    }
    const preMonth = dayjs()
      .startOf("month")
      .month(month)
      .subtract(1, "month")
      .month();
    setMonth(preMonth);
  };

  const { wallets } = useGetWalletList();

  const { defaultWallet } = useMyProfile() || {};

  console.log("defaultWallet :>> ", defaultWallet);

  return (
    <div className="flex w-full flex-col h-[calc(100%-64px)] overflow-auto">
      <div className="bg-white border-b-1 mb-3">
        <div className="text-center p-3">
          <div className="w-[200px] mx-auto">
            <Select
              placeholder={""}
              className="w-full"
              items={wallets}
              label=""
              size="sm"
              defaultSelectedKeys={[defaultWallet?.id as string]}
            >
              {wallets.map((option) => (
                <SelectItem key={option.id as string} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex w-full items-center mb-3 border-b-1 p-2">
          <Button
            variant="light"
            className="rounded-full"
            startContent={<FontIcon type="keyboard_double_arrow_left" />}
            onClick={getPreviousMonth}
            size="sm"
          />
          <span className="text-slate-500">
            <strong>{dayjs().month(month).format("MMMM")}</strong>, {year}
          </span>
          <Button
            variant="light"
            className="rounded-full"
            startContent={<FontIcon type="keyboard_double_arrow_right" />}
            onClick={getNextMonth}
            size="sm"
          />
          <Button
            color="primary"
            onClick={() => {
              setMonth(dayjs().month());
              setYear(dayjs().year());
            }}
            startContent={
              <FontIcon type="calendar_month" className="text-base" />
            }
            size="sm"
          >
            Today
          </Button>
        </div>
        <div className="mb-2">
          <TransactionSummary />
        </div>
      </div>

      <TransactionList />
    </div>
  );
};

export default TransactionTab;
