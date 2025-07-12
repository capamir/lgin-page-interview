import { forwardRef, ChangeEvent, InputHTMLAttributes } from "react";
import styles from "@/app/auth/auth.module.scss";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange, error, ...rest }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter phone number (e.g., 09123456789)"
          className={`${styles.input} ${error ? styles.error : ""}`}
          {...rest}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);
// for better debugging
InputField.displayName = "InputField";

export default InputField;