import { ICommonFormData } from "interfaces";
import { commonValidation } from "utils/common-validation";

export const loginFormData: ICommonFormData[] = [
  {
    name: "login",
    label: "Имя пользователя",
    type: "text",
    required: true,
    validate: commonValidation,
    initialValue: "",
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    required: true,
    validate: commonValidation,
    initialValue: "",
  },
];
