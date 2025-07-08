import { ChangeEvent } from "react";
import styles from "@/app/auth/auth.module.scss";

interface InputFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export default function InputField({ value, onChange, error }: InputFieldProps) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter phone number (e.g., 09123456789)"
        className={`${styles.input} ${error ? styles.error : ""}`}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}