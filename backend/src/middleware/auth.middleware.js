import jwt from "jsonwebtoken";
import prisma from "../config/db.config.js";
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: 'UnAuthorized' })
  }
  console.log("The token is", authHeader);
  const token = authHeader.split(" ")[1];
  // * verify the jwt token
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ status: 401, message: "UnAuthorized" });
    }
    const userData = await prisma.user.findUnique({
      where: {
        id: Number(user.id)
      }
    })
    console.log(userData, "line 21");
    if (!userData) {
       return res.status(401).json({ status: 401, message: "UnAuthorized" });
    }
    req.user = user;
    // console.log(req.user,"authmiddleware");
    next();
  });
}

export default authMiddleware;