"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "./core/Form";
import Button from "./core/Button";
import { fetchAndStoreUser } from "@/utils/api";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (phoneNumber: string) => {
    await fetchAndStoreUser(phoneNumber);
    router.push("/dashboard");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validatePhone}
      errorMessage="Phone number must start with '09' and be 11 digits"
      placeholder="Enter phone number (e.g., 09123456789)"
      setIsLoading={setIsLoading}
    >
      <Button isLoading={isLoading}>Login</Button>
    </Form>
  );
};

export default LoginForm;