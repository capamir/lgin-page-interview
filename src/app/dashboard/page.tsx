"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserFromStorage } from "@/utils/storage";
import styles from "./dashboard.module.scss";

export default function DashboardPage() {
  const router = useRouter();
  const user = getUserFromStorage();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className={styles.container}>
      <h1>Welcome to the Dashboard</h1>
      <p>Hello, {user.name || "User"}! Your phone number is {user.phoneNumber}.</p>
    </div>
  );
}