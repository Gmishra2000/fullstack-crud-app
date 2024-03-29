import prisma from "../config/db.config.js";
import vine, { errors } from "@vinejs/vine";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../validations/userValidation.js";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);

      // check if email exist
      const findUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      // console.log(findUser,"line 20")
      if (findUser) {
        return res.status(400).json({
          errors: {
            email: "Email already taken.please use another one.",
          }
        });
      }

      //   * Encrypt the password
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);

      // * Insert the registration data into db
      const user = await prisma.user.create({
        data: payload
      });
      return res.json({
          status: 200,
          message: "User created successfully",
          user,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
         return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong.Please try again.",
        });
      }
   }
  }
  static async login(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);

      //   * Find user with email
      
      const findUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (findUser) {
        if (!bcrypt.compareSync(payload.password, findUser.password)) {
          return res.status(400).json({
            errors: {
              email: "Invalid Credentials.",
            },
          });
        }

        const payloadData = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          avatar: findUser.avatar,
          dob: findUser.dob,
          role:findUser.role,
        }
        const token = jwt.sign(payloadData, process.env.JWT_SECRET, {
          expiresIn: "365d",
        });

         return res.json({
           message: "Logged in",
           role:findUser.role,
           access_token:`Bearer ${token}`
        });
      }

      //
      return res.status(400).json({
        errors: {
          email: "No user found with this email,",
        },
      });
      return res.json({ payload });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
         return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong.Please try again.",
        });
      }
    }
  }
}

export default AuthController;