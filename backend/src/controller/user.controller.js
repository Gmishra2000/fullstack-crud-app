import prisma from "../config/db.config.js";
import { userSchema } from "../validations/userValidation.js";
import vine, { errors } from "@vinejs/vine";

class UserController{
  static async update(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(userSchema);
      const payload = await validator.validate(body);

      console.log(payload, req.user, "line 12");
      const userData = req.user;

      const findUser = await prisma.user.findUnique({
        where: {
          id: userData.id,
        }
      });

      if (!findUser) {
        return res.status(404).json({
            status: 404,
            message: "Invalid User",
        });
      }

      await prisma.user.update({
        data: payload,
        where: {
          id: userData.id,
        }
      });
      return res.json({
        status: 200,
        message: "Profile updated successfully!",
      });
    } catch (error) {
      console.log(error);
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

  static async delete(req, res) {
    try {
      console.log(req.params.id);
      const { id } = req.params;
      const user = req.user;

      const userData = await prisma.user.findUnique({
        where: {
          id: Number(id)
        }
      })
      // if (user.id !== userData?.id) {
      //   return res.status(401).json({ message: "Un Authorized" });
      // }

      await prisma.user.delete({
        where: {
          id: Number(id)
        }
      });
      return res.json({ message: "User deleted successfully!" });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.Please try again.",
      });
    }
  }

  static async getUser(req, res) {
    try {
      const user = req.user;
      // if (Number (id) !== Number(user.id)) {
      //   return res.status(401).json({ message: "Un Authorized User" });
      // }
      const userData = await prisma.user.findUnique({
        where: {
          id: Number(user.id)
        },
        select: {
          id: true,
          name: true,
          dob: true,
          avatar: true,
          email: true,
          role:true
        }
      });
      return res.json({ status: 200, data: userData });
    } catch {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.Please try again.",
      });
    }
  }

  static async getAllUser(req, res) {
    try {
      const userData = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          dob: true,
          avatar:true
        }
      });
      return res.json({ status: 200, data: userData });
    } catch {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.Please try again.",
      });
    }
  }
}

export default UserController;