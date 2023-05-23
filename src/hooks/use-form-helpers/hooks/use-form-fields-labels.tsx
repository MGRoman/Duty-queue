import { useMemo } from "react";
import { Form, Typography } from "antd";

import { ICommonFormData } from "interfaces";
import { IFormHelpers } from "./interfaces";
import { firstUC } from "utils";

export const useFormFieldsLabels = (
  formData: ICommonFormData[],
  formHelpers: IFormHelpers
) => {
  const { classes, errors, touched } = formHelpers;

  return useMemo(() => {
    return formData.reduce<
      Record<string, React.FC<{ children: React.ReactNode }>>
    >(
      (acc, { name, label, required = false }) => ({
        ...acc,
        [name]: ({ children }) => (
          <Form.Item
            required={required}
            label={
              <Typography.Title
                className={`${classes?.["field-label"]}`}
                level={5}
              >
                {firstUC(label || name)}
              </Typography.Title>
            }
            validateStatus={
              Boolean(errors[name] && touched[name]) ? "error" : undefined
            }
            help={
              Boolean(errors[name] && touched[name])
                ? String(errors[name])
                : undefined
            }
          >
            {children}
          </Form.Item>
        ),
      }),
      {} as Record<string, React.FC<{ children: React.ReactNode }>>
    );
  }, [classes, errors, touched, formData]);
};
