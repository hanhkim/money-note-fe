import React, { FC, memo } from "react";
import classnames from "classnames";
import { FontIconType } from "./fontIconType";

const FontIcon: FC<FontIconProps> = React.forwardRef(
  ({ type, className = "" }, ref) => (
    <span
      className={classnames(
        "material-icons-outlined material-symbols-outlined",
        className
      )}
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
}
