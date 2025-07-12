"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserFromStorage } from "@/utils/storage";
import LoginForm from "@/components/LoginForm";
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
      <LoginForm />
    </div>
  );
}