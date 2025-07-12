"use client";

import { useState, useEffect, useRef, FormEvent, ReactNode } from "react";
import InputField from "./InputField";

interface FormProps {
  onSubmit: (data: string) => Promise<void>;
  validate: (data: string) => boolean;
  errorMessage: string;
  placeholder: string;
  children: ReactNode;
}

const Form = ({ onSubmit, validate, errorMessage, placeholder, children }: FormProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      <InputField
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        error={error}
        placeholder={placeholder}
      />
      {children}
    </form>
  );
};

export default Form;