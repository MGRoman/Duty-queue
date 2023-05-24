import { ISelectOptions } from "interfaces/ICommonFormData";

export const getFormDataOptions = (data: Record<string, any>[], key: string) =>
  [...new Set(data.flatMap((item) => item[key]))].reduce<ISelectOptions[]>(
    (acc, keyValue) =>
      keyValue
        ? [
            ...acc,
            {
              value: String(keyValue),
              label: String(keyValue),
            },
          ]
        : [...acc],
    [] as ISelectOptions[]
  );
