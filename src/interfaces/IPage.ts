import React from "react";

export interface IPage {
  key: string;
  title: string;
  path: string;
  Component: React.ReactNode;
  icon?: JSX.Element | HTMLElement;
  default?: boolean;
  defaultNotInitialized?: boolean;
  disabled?: boolean;
  exact?: boolean;
}
