"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import TransactionList from "./TransactionList";
import {
  ITransactionListStore,
  useTransactionListStore,
} from "./transactionList.store";
import FontIcon from "@/components/icon/FontIcon";
import dayjs from "dayjs";

const TransactionTab = () => {
  const [year, setYear] = useState(dayjs().year());

  const { setMonth, month } = useTransactionListStore(
    (state: ITransactionListStore) => ({
      setMonth: state.setMonth,
      month: state.month,
    })
  );

  const getNextMonth = () => {
    console.log("month, year :>> ", month, year);
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

  return (
    <div className="flex w-full flex-col h-[calc(100%-64px)] overflow-auto">
      <div className="flex w-full items-center mb-3">
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
      <TransactionList />
    </div>
  );
};

export default TransactionTab;
