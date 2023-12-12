import React, { FC, memo } from "react";
import classnames from "classnames";
import { FontIconType } from "./fontIconType";

const FontIcon: FC<FontIconProps> = React.forwardRef(
  ({ type, className = "", onClick }, ref) => (
    <span
      className={classnames(
        "material-icons-outlined material-symbols-outlined",
        className
      )}
      onClick={onClick}
    >
      {type}
    </span>
  )
);

FontIcon.displayName = "FontIcon";

export default memo(FontIcon);

export interface FontIconProps {
  type: FontIconType;
  className?: string;
  onClick?: React.MouseEventHandler<any>;
}
