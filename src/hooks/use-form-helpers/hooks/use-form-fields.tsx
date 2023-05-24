import { useMemo } from "react";
import { Input, Select, SelectProps, Form, Typography } from "antd";

import { FormItemProps } from "antd/es/form";
import { ICommonFormData } from "interfaces";
import { IFormHelpers } from "./interfaces";
import { firstUC } from "utils";

export const useFormFields = (formData: ICommonFormData[], formHelpers: IFormHelpers) => {
  const { values, handleChange, handleBlur, setFieldValue, classes, errors, touched } = formHelpers;

  return useMemo<Record<string, JSX.Element>>(
    () =>
      formData.reduce((acc, { name, type = "text", options = [], validate, disabled, required, label }) => {
        const formItemOtions: FormItemProps = {
          // name,
          required,
          label: (
            <Typography.Title className={`${classes?.["field-label"]}`} level={5}>
              {firstUC(label || name)}
            </Typography.Title>
          ),
          validateStatus: Boolean(errors[name] && touched[name]) ? "error" : "success",
          help: Boolean(errors[name] && touched[name]) ? String(errors[name]) : undefined,
        };

        switch (type) {
          case "password":
          case "text":
            return {
              ...acc,
              [name]: (
                <Form.Item {...{ ...formItemOtions }}>
                  <Input
                    className={classes?.["field-data"]}
                    disabled={disabled}
                    type={type}
                    value={values[name]}
                    onChange={handleChange(name)}
                    onBlur={handleBlur(name)}
                    placeholder={firstUC("Введите значение")}
                  />
                </Form.Item>
              ),
            };

          case "multi-select":
          case "select":
            const selectMode: SelectProps<any>["mode"] = type === "multi-select" ? "multiple" : undefined;

            return {
              ...acc,
              [name]: (
                <Form.Item {...formItemOtions}>
                  <Select
                    className={classes?.["field-data"]}
                    disabled={disabled}
                    mode={selectMode}
                    placeholder={firstUC("Выберите опции")}
                    options={options}
                    value={values[name]}
                    onChange={(newValues) => setFieldValue(name, newValues, Boolean(validate))}
                    onBlur={handleBlur(name)}
                  />
                </Form.Item>
              ),
            };

          default:
            return { ...acc };
        }
      }, {}),
    [classes, errors, formData, handleBlur, handleChange, setFieldValue, touched, values]
  );
};
