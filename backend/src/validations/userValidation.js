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




// export const registerSchema = joi.object({
//   name: joi.string().min(2).max(150).required(),
//   email: joi.string().email().required(),
//   password: joi.string().min(6).max(100).required(),
//   confirmPassword: joi.string().valid(joi.ref('password')).required(),
//   dob:joi.number().integer().min(1900).max(2025).required(),
//   role: joi.valid(Role.ADMIN,Role.USER).optional(),
// });

// export const loginSchema = joi.object({
//   email: joi.string().email().required(),
//   password: joi.string().required(),
// });


