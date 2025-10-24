import z from "zod";
import { IsActive, Role } from "./user.interface";


export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name too short, minimum two characters required" })
    .max(50, { message: "Name too long" }),

  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(100, { message: "Email cannot exceed 100 characters" })
    .email({ message: "Invalid email address format" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one digit",
    })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    }),

  age: z.number().min(1, { message: "Age must be a positive number" }),

  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, {
      message:
        "Phone number must be 10-15 digits and can start with + (e.g. +8801234567890)",
    })
    .optional(),

  adress: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address too long, maximum 100 characters" })
    .optional(),
});



export const updatedUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name too short, minimum two characters required" })
    .max(50, { message: "Name too long" })
    .optional(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one digit",
    })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    })
    .optional(),

  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, {
      message:
        "Phone number must be 10-15 digits and can start with + (e.g. +8801234567890)",
    })
    .optional(),

  role: z.enum(Object.keys(Role) as [string]).optional(),

  IsActive: z.enum(Object.values(IsActive) as [string]).optional(),

  // ✅ Instead of invalid_type_error
  isDeleted: z
    .boolean()
    .refine((val) => typeof val === "boolean", {
      message: "isDeleted must be true or false",
    })
    .optional(),

  isVarified: z
    .boolean()
    .refine((val) => typeof val === "boolean", {
      message: "isVarified must be true or false",
    })
    .optional(),

  adress: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address too long, maximum 100 characters" })
    .optional(),
});
