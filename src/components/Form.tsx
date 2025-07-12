"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import Button from "./Button";
import { User } from "@/types/user";

interface FormProps {
  errorMessage: string;
  placeholder: string;
  fetchAndStoreUser: (phoneNumber: string) => Promise<User>;
}

const Form = ({ errorMessage, placeholder, fetchAndStoreUser }: FormProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phoneNumber)) {
      setError(errorMessage);
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await fetchAndStoreUser(phoneNumber);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        ref={inputRef}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={error}
        placeholder={placeholder}
      />
      <Button isLoading={isLoading}>Login</Button>
    </form>
  );
};

export default Form;