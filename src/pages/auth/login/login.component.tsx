import React from "react";
import { useForm } from "react-hook-form";

import { Button, Input } from "../../../components";
import { FormData, schema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "../../../store";

const Login: React.FC = () => {
  const { handleLogin } = useStore()
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmitForm = (form: FormData) => {
    handleLogin(form.email)
  };

  return (
    <div className="w-[100vw] grid h-[100vh] flex items-center justify-center">
      <div className="flex flex-col w-[300px] gap-3">
        <Input
          control={control}
          name="email"
          placeholder="digite seu e-mail"
          type="email"
          label="E-mail"
        />
        <Input
          control={control}
          name="password"
          placeholder="digite sua senha"
          type="password"
          label="Senha"
        />

        <div className="flex w-full">
          <Button onClick={handleSubmit(onSubmitForm)} title="Entrar" />
        </div>
      </div>
    </div>
  );
};

export default Login;
