"use client";

import { useState, useEffect, useRef, FormEvent, ReactNode, Dispatch, SetStateAction } from "react";
import InputField from "./InputField";
import styles from "@/app/auth/auth.module.scss";

interface FormProps {
  onSubmit: (data: string) => Promise<void>;
  validate: (data: string) => boolean;
  errorMessage: string;
  placeholder: string;
  children: ReactNode;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Form = ({ onSubmit, validate, errorMessage, placeholder, children, setIsLoading }: FormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate(inputValue)) {
      setError(errorMessage);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await onSubmit(inputValue);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputField
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.error : ""}`}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      {children}
    </form>
  );
};

export default Form;