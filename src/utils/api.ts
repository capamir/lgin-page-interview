import { User } from "@/types/user";
import { setUserInStorage } from "./storage";

export const API_URL = "https://randomuser.me/api/?results=1&nat=us";

interface ApiUser {
  phone: string;
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
}

export const fetchUserData = async (apiUrl: string = API_URL): Promise<User> => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    const apiUser: ApiUser = data.results[0];
    return {
      phoneNumber: "",
      phone: apiUser.phone || "",
      name: `${apiUser.name?.title || ""} ${apiUser.name?.first || ""} ${apiUser.name?.last || ""}`.trim(),
      email: apiUser.email || "",
    };
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

export const fetchUser = async (apiUrl: string = API_URL, phoneNumber: string): Promise<User> => {
  const user = await fetchUserData(apiUrl);
  return { ...user, phoneNumber };
};

export const fetchAndStoreUser = async (phoneNumber: string): Promise<User> => {
  try {
    const user = await fetchUser(API_URL, phoneNumber);
    setUserInStorage(user);
    return user;
  } catch (error) {
    console.error("Failed to fetch and store user:", error);
    throw error;
  }
};