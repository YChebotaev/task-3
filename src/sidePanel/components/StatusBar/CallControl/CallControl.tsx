import { type FC } from "react";
import { Button, Input } from "@mui/joy";
import { Phone } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Root } from "./styled";
import { ErrorMessage } from "../../ErrorMessage";
import { useUA } from "src/sidePanel/hooks/useUA";
import { useNavigate } from "react-router";

export const CallControl: FC = () => {
  const navigate = useNavigate()
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  return (
    <Root
      onSubmit={handleSubmit(({ phone }) => {
        navigate(`/call?phone=${encodeURIComponent(phone)}`)
      })}
    >
      <Input
        placeholder="Номер телефона"
        {...register("phone", { required: "Номер телефона обязателен" })}
      />
      <ErrorMessage errors={errors} name="phone" />

      <Button type="submit">
        <Phone />
      </Button>
    </Root>
  );
};
