import { BsCalendarCheck } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi'
import { IPage } from "../interfaces";

export const pages = [
  {
    page: "login",
    title: "login",
    Component: <div>Login</div>,
    path: "/login/",
    icon: <FiLogIn style={{ fontSize: '19px' }} />,
    default: false,
    defaultNotInitialized: true,
  },
  {
    page: "calendar",
    title: "Календарь",
    Component: <div>Календарь</div>,
    path: "/calendar/",
    icon: <BsCalendarCheck style={{ fontSize: '19px' }} />,
    default: true,
  },
] as IPage[];
