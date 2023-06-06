import { ICommonFormData } from "interfaces";

interface IClearedFormValues extends Record<string, any> {
  [name: string]: ICommonFormData["initialValue"];
}

export const getClearedFormValues = (initial?: IClearedFormValues) => {
  if (!initial) return {} as IClearedFormValues;

  return Object.keys(initial).reduce<IClearedFormValues>((acc, name) => {
    let value;

    if (Array.isArray(initial[name])) {
      value = [];
    }

    switch (typeof initial[name]) {
      case "boolean":
        value = false;

        break;

      case "number":
        value = 0;

        break;

      case "string":
        value = "";

        break;

      default:
        value = {};

        break;
    }

    return { ...acc, [name]: value };
  }, {} as IClearedFormValues);
};
