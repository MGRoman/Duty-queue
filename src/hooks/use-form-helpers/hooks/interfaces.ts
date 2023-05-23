import { useFormik } from "formik";

import { IUseForm } from "./use-form";

export interface IFormHelpers {
  values: ReturnType<typeof useFormik>["values"];
  errors: ReturnType<typeof useFormik>["errors"];
  touched: ReturnType<typeof useFormik>["touched"];
  handleChange: ReturnType<typeof useFormik>["handleChange"];
  handleBlur: ReturnType<typeof useFormik>["handleBlur"];
  setFieldValue: ReturnType<typeof useFormik>["setFieldValue"];
  classes: IUseForm<Record<string, any>>["classes"];
}
