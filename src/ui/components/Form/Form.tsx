import React, { FormEvent, FunctionComponent, ReactNode } from 'react';
import Button from "../Button/Button";
import { ButtonVariant } from "@/types";
import { FormExtraProps } from 'src/types/form';

interface FormProps {
  legend: string;
  submitText: string;
  loading?: boolean;
  buttonVariant?: ButtonVariant;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;

  extraProps?: FormExtraProps;
}

const Form: FunctionComponent<FormProps> = ({
  legend,
  submitText,
  loading = false,
  buttonVariant = "primary",
  onSubmit,
  children,
  className = "",
  extraProps = {}, // Default to empty object
}) => {
  return (
    <form onSubmit={onSubmit} className={className} {...extraProps}>
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
