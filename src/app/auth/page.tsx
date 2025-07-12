"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserFromStorage } from "@/utils/storage";
import { fetchAndStoreUser } from "@/utils/api";
import Form from "@/components/Form";
import styles from "./auth.module.scss";

export default function AuthPage() {
  const router = useRouter();
  const user = getUserFromStorage();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <Form
        errorMessage="Phone number must start with '09' and be 11 digits"
        placeholder="Enter phone number (e.g., 09123456789)"
        fetchAndStoreUser={fetchAndStoreUser}
      />
    </div>
  );
}