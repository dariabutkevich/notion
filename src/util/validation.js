import { z } from "zod";

export const User = z.object({
  email: z.string().email({ message: "Email entered incorrectly." }),
  password: z
    .string()
    .min(8)
    .refine(
      (value) => {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
      },
      {
        message:
          "The password must contain at least one uppercase letter, one lowercase letter and one digit.",
      },
    ),
});

export const generateUserId = () => {
  return Math.random().toString(36);
};

export const saveUserData = async (userData) => {
  try {
    const response = await fetch("http://localhost:5001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Error");
    }
    const responseData = await response.json();
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
