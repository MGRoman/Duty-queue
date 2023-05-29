import React from "react";
import { IDefaultComponentProps } from "interfaces";

interface IIfElse extends IDefaultComponentProps {
  condition?: any;
  Else?: JSX.Element;
}

export const If: React.FC<IIfElse> = ({ condition, Else, children }) => {
  const ElseComponent = Boolean(Else) ? <>{Else}</> : null;

  return Boolean(condition) ? <>{children}</> : ElseComponent;
};
