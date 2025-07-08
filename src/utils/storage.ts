import { User } from "@/types/user";

export const setUserInStorage = (user: User): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to set user in localStorage:", error);
    }
  }
};

export const getUserFromStorage = (): User | null => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) as User : null;
    } catch (error) {
      console.error("Failed to get user from localStorage:", error);
      return null;
    }
  }
  return null;
};