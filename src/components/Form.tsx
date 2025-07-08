"use client";

import { useState } from "react";
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
        phoneNumber, // User-entered phone number
        phone: apiUser.phone || "", // API-provided phone number, fallback to empty string
        name: `${apiUser.name?.title || ""} ${apiUser.name?.first || ""} ${apiUser.name?.last || ""}`.trim(), // Combine name fields
        email: apiUser.email || "", // API-provided email, fallback to empty string
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
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={error}
      />
      <Button disabled={isLoading}>Login</Button>
    </form>
  );
}