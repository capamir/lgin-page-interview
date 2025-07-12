import { forwardRef, ChangeEvent, InputHTMLAttributes } from "react";
import styles from "@/app/auth/auth.module.scss";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={rest.placeholder || "Enter text"}
        className={styles.input}
        {...rest}
      />
    );
  }
);

InputField.displayName = "InputField";

export default InputField;