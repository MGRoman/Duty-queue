import React, { useCallback } from "react";
import { Form } from "antd";

import { loginFormData } from "./consts";
import { useForm } from "hooks";

import classes from "./login.module.scss";

interface ILoginFormValues {
  login: string;
  password: string;
}

export const Login: React.FC = () => {
  const onOkHandler = useCallback((values: ILoginFormValues) => {
    console.log(values);
  }, []);

  const { FormFields, SubmitButton, CancelButton, handleSubmit } = useForm({
    formData: loginFormData,
    onOk: onOkHandler,
    resetOnCancel: true,
    classes,
  });

  return (
    <div className={classes["login"]}>
      <Form onFinish={() => handleSubmit()} className={classes["login-form"]} labelCol={{ span: 8 }}>
        <div className={classes["fields-container"]}>{loginFormData.map(({ name }) => FormFields[name])}</div>

        <div className={classes["buttons-container"]}>
          {CancelButton}

          {SubmitButton}
        </div>
      </Form>
    </div>
  );
};
