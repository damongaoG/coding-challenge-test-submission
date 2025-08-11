import { ChangeEvent, useCallback, useState } from "react";

export interface FormFieldValues {
  [key: string]: string;
}

export interface FormFieldHandlers<T = FormFieldValues> {
  onChange: (fieldName: keyof T, value: string) => void;
  handleChange: (
    fieldName: keyof T
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
  setValue: (fieldName: keyof T, value: string) => void;
  setValues: (values: Partial<T>) => void;
}

export interface UseFormFieldsReturn<T = FormFieldValues> {
  values: T;
  handlers: FormFieldHandlers<T>;
}

export function useFormFields<T extends FormFieldValues>(
  initialValues: T
): UseFormFieldsReturn<T> {
  const [values, setValuesState] = useState<T>(initialValues);

  /**
   * Updates a specific field
   * @param fieldName - The name of the field to update
   * @param value - The new value for the field
   */
  const onChange = useCallback((fieldName: keyof T, value: string) => {
    setValuesState((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  }, []);

  /**
   * Returns a event handler for a specific field
   * @Param fieldName - The name of the field
   * @returns Event handler function
   */
  const handleChange = useCallback(
    (fieldName: keyof T) => {
      return (event: ChangeEvent<HTMLInputElement>) => {
        onChange(fieldName, event.target.value);
      };
    },
    [onChange]
  );

  const reset = useCallback(() => {
    setValuesState(initialValues);
  }, [initialValues]);

  /**
   * Set a specific field value
   * @param fieldName - The name of the field to update
   * @param value - The new value for the field
   */
  const setValue = useCallback(
    (fieldName: keyof T, value: string) => {
      onChange(fieldName, value);
    },
    [onChange]
  );

  /**
   * Set multiple field values at once
   * @param newValues - Object containing field names and new values
   */
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prevValues) => ({
      ...prevValues,
      ...newValues,
    }));
  }, []);

  return {
    values,
    handlers: {
      onChange,
      handleChange,
      reset,
      setValue,
      setValues,
    },
  };
}

export default useFormFields;
