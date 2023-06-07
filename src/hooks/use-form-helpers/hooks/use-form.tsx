import { useCallback, useEffect, useMemo } from "react";
import { FormikConfig, FormikErrors, useFormik } from "formik";
import { Button, Form } from "antd";

import { ICommonFormData } from "interfaces";
import { IDrawerPanelHelpers } from "hooks/use-drawer-panel";
import { validateForm } from "..";
import { useFormFields } from "./use-form-fields";
import { firstUC } from "utils";
import { getClearedFormValues } from "../utils/get-cleared-form-values";

export interface IUseForm<T> extends Omit<FormikConfig<T>, "initialValues" | "onSubmit"> {
  formData: ICommonFormData[];
  open?: boolean;
  onOk?: (values: T, helpers?: IDrawerPanelHelpers, isDefaultApply?: boolean) => void;
  onClose?: VoidFunction;
  resetOnCancel?: boolean;
  classes?: {
    "field-label"?: string;
    "field-data"?: string;
    "submit-button"?: string;
    "cancel-button"?: string;
  };
  submitText?: string;
  cancelText?: string;
  initialValues?: T;
}

export const useForm = <T extends Record<string, any>>({
  formData,
  initialValues,
  open = true,
  onOk,
  onClose,
  resetOnCancel = false,
  submitText = firstUC("принять"),
  cancelText = firstUC("отмена"),
  classes,
}: IUseForm<T>) => {
  const initialFormValues = useMemo(
    () =>
      initialValues
        ? initialValues
        : formData.reduce((acc, { name, initialValue }) => ({ ...acc, [name]: initialValue }), {} as T),
    [formData, initialValues]
  );

  const {
    values,
    touched,
    errors,
    isValid,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialFormValues,
    onSubmit: () => {},
    validate: validateForm(formData),
    validateOnMount: true,
  });

  const initialize = useCallback(() => {
    resetForm({
      values: initialFormValues,
      errors: validateForm(formData)(initialFormValues) as FormikErrors<T>,
    });
  }, [formData, initialFormValues, resetForm]);

  useEffect(() => {
    if (initialFormValues) {
      initialize();
    }
  }, [initialFormValues, initialize]);

  useEffect(() => {
    !open && initialize();
  }, [open, initialize]);

  const formSubmit = useCallback(
    (helpers?: IDrawerPanelHelpers, isDefaultApply?: boolean) => {
      if (onOk) {
        onOk && onOk(values, helpers, isDefaultApply);
      } else {
        handleSubmit();
      }
    },
    [onOk, handleSubmit, values]
  );

  const formCancel = useCallback(() => {
    onClose && onClose();

    resetOnCancel && resetForm();
  }, [onClose, resetForm, resetOnCancel]);

  const formClear = useCallback(() => {
    setValues(getClearedFormValues(initialFormValues) as T, true);
  }, [initialFormValues, setValues]);

  const FormFields = useFormFields(formData, {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    classes,
  });

  const SubmitButton = useMemo(
    () => (
      <Form.Item>
        <Button htmlType="submit" disabled={!isValid} className={classes?.["submit-button"]}>
          {submitText}
        </Button>
      </Form.Item>
    ),
    [classes, isValid, submitText]
  );

  const CancelButton = useMemo(
    () => (
      <Form.Item>
        <Button onClick={formCancel} className={classes?.["cancel-button"]}>
          {cancelText}
        </Button>
      </Form.Item>
    ),
    [cancelText, classes, formCancel]
  );

  return useMemo(
    () => ({
      initialValues: initialFormValues,
      values,
      touched,
      errors,
      isValid,
      handleChange,
      setFieldValue,
      setValues,
      handleBlur,
      handleSubmit: formSubmit,
      resetForm,
      clearForm: formClear,
      initialize,
      FormFields,
      SubmitButton,
      CancelButton,
    }),
    [
      CancelButton,
      FormFields,
      SubmitButton,
      errors,
      formClear,
      formSubmit,
      handleBlur,
      handleChange,
      initialFormValues,
      initialize,
      isValid,
      resetForm,
      setFieldValue,
      setValues,
      touched,
      values,
    ]
  );
};
