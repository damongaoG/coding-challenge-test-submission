import React, { FormEvent, FunctionComponent, ReactNode } from 'react';
import Button from "../Button/Button";
import { ButtonVariant } from "@/types";

interface FormProps {
  legend: string;
  submitText: string;
  loading?: boolean;
  buttonVariant?: ButtonVariant;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

const Form: FunctionComponent<FormProps> = ({
  legend,
  submitText,
  loading = false,
  buttonVariant = "primary",
  onSubmit,
  children,
  className = "",
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <fieldset>
        <legend>{legend}</legend>
        {children}
        <Button type="submit" loading={loading} variant={buttonVariant}>
          {submitText}
        </Button>
      </fieldset>
    </form>
  );
};

export default Form;
