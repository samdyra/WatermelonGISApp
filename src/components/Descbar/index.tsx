import React, { memo } from "react";
import s from "./descbar.module.scss";

interface Props {
  isOpen: boolean;
}

const DescBar = (props: Props) => (
  <div
    className={s.wrapper}
    style={{ width: !props.isOpen ? "0px" : "350px" }}
  ></div>
);

export default memo(DescBar);
