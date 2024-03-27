import { type FC } from "react";
import { type FieldErrors } from "react-hook-form";
import {
  ErrorMessage as BaseErrorMessage,
  type Props,
} from "@hookform/error-message";
import { ErrorText } from "./styled";

export const ErrorMessage = <
  TFieldErrors extends FieldErrors,
  TAs extends
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | keyof JSX.IntrinsicElements
    | React.ComponentType<any>,
>(
  props: Props<TFieldErrors, TAs>,
) => (
  <BaseErrorMessage
    render={({ message }) => <ErrorText>{message}</ErrorText>}
    {...props}
  />
);
