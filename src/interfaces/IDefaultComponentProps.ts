import React from "react";
import { CSSProperties } from "react";

export interface IDefaultComponentProps {
  className?: string;
  style?: CSSProperties;
  role?: string;
  children?: React.ReactNode;
}
