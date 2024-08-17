import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { convertNumberToCurrency } from "@/helpers/common.helpers";

const TransactionSummary = () => {
  const items = useMemo(
    () => [
      {
        text: "Total income",
        value: convertNumberToCurrency(1550000),
      },
      {
        text: "Total expense",
        value: convertNumberToCurrency(1000000),
      },
      {
        text: "Total balance",
        value: convertNumberToCurrency(550000),
      },
      {
        text: "Transfer to other wallet",
        value: convertNumberToCurrency(0),
      },
      {
        text: "Get money from other wallet",
        value: convertNumberToCurrency(0),
      },
      {
        text: "Begin of month",
        value: convertNumberToCurrency(0),
      },
      {
        text: "End of month",
        value: convertNumberToCurrency(0),
      },
    ],
    []
  );

  return (
    <div className="px-3">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between gap-0">
          <div className="text-neutral-500 text-sm">{item.text}</div>
          <div className="text-neutral-700 italic text-sm">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default TransactionSummary;
