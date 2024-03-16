import express from "express";
import "dotenv/config";
import cors from "cors";
import fileUpload from "express-fileupload";

const server = express();
const PORT = process.env.PORT || 8000;

// * Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(fileUpload());
server.use(express.static("public"));
server.use(cors());
server.get("/", (req, res) => {
  return res.json({ message: "Hello" });
});

// * Import routes
import ApiRoutes from "./routes/api.router.js";
server.use("/api", ApiRoutes);

server.listen(PORT, () =>
  console.log(`server is running on port ${PORT}`)
);

