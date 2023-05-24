import React, { useCallback } from "react";
import { Form } from "antd";

import { loginFormData } from "./consts";
import { useForm } from "hooks";

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
  });

  return (
    <Form onFinish={() => handleSubmit()}>
      {loginFormData.map(({ name }) => (
        <div key={name}>{FormFields[name]}</div>
      ))}

      <div>
        {CancelButton}

        {SubmitButton}
      </div>
    </Form>
  );
};
