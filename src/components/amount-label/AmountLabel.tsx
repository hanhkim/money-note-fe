import React from "react";
import PropTypes from "prop-types";
import { convertNumberToCurrency } from "@/helpers/common.helpers";
import classNames from "classnames";

interface IAmountLabelProps {
  value: number;
  className?: string;
}
const AmountLabel = (props: IAmountLabelProps) => {
  const { value, className } = props;

  return (
    <div
      className={classNames(
        {
          "text-green-800": value > 0,
          "text-red-500": value < 0,
        },
        className
      )}
    >
      {convertNumberToCurrency(value || 0)}
    </div>
  );
};

export default AmountLabel;
