import { useCallback, useEffect, useMemo } from "react";
import { FormikConfig, FormikErrors, useFormik } from "formik";
import { Button } from "antd";

import { ICommonFormData } from "interfaces";
import { IDrawerPanelHelpers } from "hooks/use-drawer-panel";
import { validateForm } from "..";
import { useFormFields } from "./use-form-fields";
import { firstUC } from "utils";

export interface IUseForm<T>
  extends Omit<FormikConfig<T>, "initialValues" | "onSubmit"> {
  formData: ICommonFormData[];
  open?: boolean;
  onOk: (
    values: T,
    helpers?: IDrawerPanelHelpers,
    isDefaultApply?: boolean
  ) => void;
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
}

export const useForm = <T extends Record<string, any>>({
  formData,
  open = true,
  onOk,
  onClose,
  resetOnCancel = false,
  submitText = firstUC("принять"),
  cancelText = firstUC("отмена"),
  classes,
}: IUseForm<T>) => {
  const initialValues = useMemo(
    () =>
      formData.reduce(
        (acc, { name, initialValue }) => ({ ...acc, [name]: initialValue }),
        {} as T
      ),
    [formData]
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
    initialValues,
    onSubmit: () => {},
    validate: validateForm(formData),
    validateOnMount: true,
  });

  const initialize = useCallback(() => {
    resetForm({
      values: initialValues,
      errors: validateForm(formData)(initialValues) as FormikErrors<T>,
    });
  }, [formData, initialValues, resetForm]);

  useEffect(() => {
    if (initialValues) {
      initialize();
    }
  }, [initialValues, initialize]);

  useEffect(() => {
    !open && initialize();
  }, [open, initialize]);

  const formSubmit = useCallback(
    (event: any, helpers?: IDrawerPanelHelpers, isDefaultApply?: boolean) => {
      event && event.preventDefault();

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
      <Button
        className={classes?.["submit-button"]}
        disabled={!isValid}
      >
        {submitText}
      </Button>
    ),
    [isValid, submitText, classes]
  );

  const CancelButton = useMemo(
    () =>
      onClose ? (
        <Button onClick={formCancel} className={classes?.["cancel-button"]}>
          {cancelText ?? ""}
        </Button>
      ) : null,
    [cancelText, classes, formCancel, onClose]
  );

  return {
    initialValues,
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
    initialize,
    FormFields,
    SubmitButton,
    CancelButton,
  };
};
