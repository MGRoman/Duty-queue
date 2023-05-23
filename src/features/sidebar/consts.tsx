import { Link } from "react-router-dom";

import { pages } from "consts/pages";

export const sideBarMenuItems = pages.map((page) => ({
  key: page.key,
  label: <Link to={page.path}>{page.title}</Link>,
  icon: page.icon as React.ReactNode,
}));
