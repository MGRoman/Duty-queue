import { FormikErrors } from "formik";

import { ICommonFormData } from "interfaces";

export const validateForm =
  <T extends Record<string, any>>(formData: ICommonFormData[]) =>
  (validateValues: T) => {
    const validateErrors: FormikErrors<T> = {};

    formData.forEach(({ name, validate }) => {
      const field = name as keyof T;

      if (validate && validate(validateValues[field])?.message) {
        validateErrors[field] = validate(validateValues[field])?.message as FormikErrors<T>["field"];
      }
    });

    return validateErrors;
  };
