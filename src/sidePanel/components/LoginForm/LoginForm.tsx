import { type FC } from "react";
import { Input, Button } from "@mui/joy";
import { useForm } from "react-hook-form";
import { Root, FieldContainer } from "./styled";
import { type Credentials } from "../../lib/createUA";
import { ErrorMessage } from "../ErrorMessage";

export const LoginForm: FC<{
  onLogin(params: Credentials): void;
}> = ({ onLogin }) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Credentials>({
    defaultValues: {
      address: "",
      username: "",
      password: "",
    },
  });

  return (
    <Root onSubmit={handleSubmit(onLogin)}>
      <FieldContainer>
        <Input
          placeholder="Адрес сервера"
          color={errors.address ? "danger" : "neutral"}
          {...register("address", {
            required: "Адрес обязателен",
          })}
        />
        <ErrorMessage errors={errors} name="address" />
      </FieldContainer>

      <FieldContainer>
        <Input
          placeholder="Имя пользователя"
          color={errors.username ? "danger" : "neutral"}
          {...register("username", {
            required: "Имя пользователя обязательно",
          })}
        />
        <ErrorMessage errors={errors} name="username" />
      </FieldContainer>

      <FieldContainer>
        <Input
          placeholder="Пароль"
          type="password"
          color={errors.password ? "danger" : "neutral"}
          {...register("password", {
            required: "Пароль обязателен",
          })}
        />
        <ErrorMessage errors={errors} name="password" />
      </FieldContainer>

      <Button type="submit" variant="outlined" color="primary">
        Логин
      </Button>
    </Root>
  );
};
