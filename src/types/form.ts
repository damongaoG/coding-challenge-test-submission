import React, { FormHTMLAttributes } from "react";

type ReservedFormProps = "onSubmit" | "children" | "className";

// Create a type for all possible HTML form attributes
export type FormExtraProps = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  ReservedFormProps
>;

export interface FormExtraPropsInterface {
  // Form-specific attributes
  action?: string;
  method?: "get" | "post" | "put" | "delete";
  encType?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain";
  acceptCharset?: string;
  autoComplete?: "on" | "off";
  noValidate?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top" | string;

  // Common HTML attributes
  id?: string;
  name?: string;
  title?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;

  // Data attributes
  [key: `data-${string}`]: string | number | boolean | undefined;

  // Event handlers (commonly used ones)
  onReset?: (event: React.FormEvent<HTMLFormElement>) => void;
  onInvalid?: (event: React.FormEvent<HTMLFormElement>) => void;
}
