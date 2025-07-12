"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import InputField from "./InputField";
import Button from "./Button";
import { setUserInStorage } from "@/utils/storage";
import { User } from "@/types/user";

export default function Form() {
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

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^09\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must start with '09' and be 11 digits");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await response.json();
      const apiUser = data.results[0];
      const user: User = {
        phoneNumber,
        phone: apiUser.phone || "",
        name: `${apiUser.name?.title || ""} ${apiUser.name?.first || ""} ${apiUser.name?.last || ""}`.trim(),
        email: apiUser.email || "",
      };
      setUserInStorage(user);
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
      />
      <Button isLoading={isLoading}>Login</Button>
    </form>
  );
}