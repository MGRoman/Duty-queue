import { useMemo } from "react";
import { Input, Select, SelectProps } from "antd";

import { ICommonFormData } from "interfaces";
import { IFormHelpers } from "./interfaces";
import { firstUC } from "utils";
import { useFormFieldsLabels } from "./use-form-fields-labels";

// const EmptyHelperTextStub = <span style={{ visibility: "hidden" }}>.</span>;

export const useFormFields = (
  formData: ICommonFormData[],
  formHelpers: IFormHelpers
) => {
  const { values, handleChange, handleBlur, setFieldValue, classes } =
    formHelpers;

  const FormFieldsLabels = useFormFieldsLabels(formData, formHelpers);

  return useMemo<Record<string, JSX.Element>>(
    () =>
      formData.reduce(
        (
          acc,
          { name = "", type = "text", options = [], validate, disabled }
        ) => {
          const Field = FormFieldsLabels[name];

          switch (type) {
            case "password":
            case "text":
              return {
                ...acc,
                [name]: (
                  <Field>
                    <Input
                      className={classes?.["field-data"]}
                      disabled={disabled}
                      type={type}
                      value={values[name] ?? ""}
                      onChange={handleChange(name)}
                      onBlur={handleBlur(name)}
                      placeholder={firstUC("Введите значение")}
                    />
                  </Field>
                ),
              };

            case "multi-select":
            case "select":
              const selectMode: SelectProps<any>["mode"] =
                type === "multi-select" ? "multiple" : undefined;

              return {
                ...acc,
                [name]: (
                  <Field>
                    <Select
                      className={classes?.["field-data"]}
                      disabled={disabled}
                      mode={selectMode}
                      placeholder={firstUC("Выберите опции")}
                      options={options}
                      value={values[name]}
                      onChange={(newValues) =>
                        setFieldValue(name, newValues, Boolean(validate))
                      }
                      onBlur={handleBlur(name)}
                    />
                  </Field>
                ),
              };

            default:
              return { ...acc };
          }
        },
        {}
      ),
    [
      FormFieldsLabels,
      classes,
      formData,
      handleBlur,
      handleChange,
      setFieldValue,
      values,
    ]
  );
};
