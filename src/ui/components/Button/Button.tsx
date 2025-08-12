import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";

import $ from "./Button.module.css";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  const buttonClasses = [
    $.button,
    variant === "primary" ? $.primary : $.secondary,
    loading ? $.loading : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      // TODO: Add conditional classNames
      // - Must have a condition to set the '.primary' className
      // - Must have a condition to set the '.secondary' className
      // - Display loading spinner per demo video. NOTE: add data-testid="loading-spinner" for spinner element (used for grading)
      className={buttonClasses}
      type={type}
      onClick={loading ? undefined : onClick}
      disabled={loading}
    >
      {loading && (
        <span
          className={$.spinner}
          data-testid="loading-spinner"
          aria-label="Loading"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
