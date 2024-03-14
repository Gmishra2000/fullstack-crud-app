import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomErrorReporter.js";
import { Role } from "../utils/common.js";

// * Custom Error Reporter
vine.errorReporter = () => new CustomErrorReporter();

export const registerSchema = vine.object({
  name: vine.string().minLength(2).maxLength(150),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(100).confirmed(),
  dob: vine.date(),
  role: vine.enum([Role.ADMIN,Role.USER]),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});



export const userSchema = vine.object({
  name: vine.string().minLength(2).maxLength(150).optional(),
  email: vine.string().email().optional(),
  dob: vine.date().optional(),
  avatar: vine.string().optional()
});


