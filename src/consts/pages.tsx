import { BsCalendarCheck } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";

import { IPage } from "interfaces";
import { Login } from "features/login";
import { SchedulePage } from "features/schedule-page";

export const pages = [
  {
    key: "login",
    title: "Вход",
    Component: <Login />,
    path: "/login/",
    icon: <FiLogIn style={{ fontSize: "19px" }} />,
    default: false,
    defaultNotInitialized: true,
  },
  {
    key: "chedule",
    title: "Расписание",
    Component: <SchedulePage />,
    path: "/chedule/",
    icon: <BsCalendarCheck style={{ fontSize: "19px" }} />,
    default: true,
  },
] as IPage[];
