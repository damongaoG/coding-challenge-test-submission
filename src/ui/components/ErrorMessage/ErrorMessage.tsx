import React, { FunctionComponent } from "react";
import $ from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({
  children,
  className,
}) => {
  const errorClasses = [$.error, className].filter(Boolean).join(" ");

  return (
    <div className={errorClasses} role="alert" aria-live="polite">
      {children}
    </div>
  );
};

export default ErrorMessage;
