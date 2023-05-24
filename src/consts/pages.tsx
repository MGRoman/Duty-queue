import { BsCalendarCheck } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";

import { IPage } from "interfaces";
import { Login } from "features/login";

export const pages = [
  {
    key: "login",
    title: "login",
    Component: <Login />,
    path: "/login/",
    icon: <FiLogIn style={{ fontSize: "19px" }} />,
    default: false,
    defaultNotInitialized: true,
  },
  {
    key: "calendar",
    title: "Календарь",
    Component: <div>Календарь</div>,
    path: "/calendar/",
    icon: <BsCalendarCheck style={{ fontSize: "19px" }} />,
    default: true,
  },
] as IPage[];
