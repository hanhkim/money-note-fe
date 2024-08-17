import React from "react";
import PropTypes from "prop-types";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";
import classNames from "classnames";

export interface IContainer {
  className?: string;
  children: React.ReactNode;
}
const Container: React.FC<IContainer> = ({ className, children }) => {
  return (
    <div
      className={classNames("bg-white shadow-md p-4 rounded", {
        className: !!className,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
