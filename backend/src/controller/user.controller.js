import prisma from "../config/db.config.js";
import { generateRandomNum, getImageUrl, imageValidator, removeImage } from "../utils/filelimitHandler.js";
import { userSchema } from "../validations/userValidation.js";
import vine, { errors } from "@vinejs/vine";

class UserController{
  static async update(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(userSchema);
      const payload = await validator.validate(body);

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

      let imageUrl = null; // Initialize imageUrl as null

      if (req.files && req.files.avatar) {
        const avatar = req.files.avatar;
        const message = imageValidator(avatar?.size, avatar.mimetype);

        if (message !== null) {
          return res.status(400).json({
            errors: {
              avatar: message,
            },
          });
        }

        const imgExt = avatar.name.split(".");
        const imageName = generateRandomNum() + "." + imgExt[1];
        const uploadPath = process.cwd() + "/public/images/" + imageName;

        imageUrl = getImageUrl(imageName); // Update imageUrl if image is uploaded

        avatar.mv(uploadPath, (err) => {
          if (err) throw err;
        });

        if (findUser.avatar) {
          removeImage(imageName);
        }
      }

      // Update payload with imageUrl
      if (imageUrl !== null) {
        payload.avatar = imageUrl;
      };

      // console.log(uploadPath, payload, "line51");
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
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return res.status(400).json({ errors: error.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "Something went wrong. Please try again.",
        });
      }
    }
  }


  static async delete(req, res) {
    try {
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
      if (!userData) {
        return res.status(401).json({ message: "User Does not exist" });
      }
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
      const { id } = req.user;
      const userData = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          dob: true,
          avatar: true,
          role: true
        }
      });
      const updatedData = userData.filter(user => { return user.id != id });;
      return res.json({ status: 200, data: updatedData });
    } catch {
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.Please try again.",
      });
    }
  }
}

export default UserController;