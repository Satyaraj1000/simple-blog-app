import express from "express";
import dotenv from "dotenv";
import connectionDb from "./db/connectionDb.js";

dotenv.config();
const app = express();

// Using middlewares
app.use(express.json());

// Importing routes
import userRouter from "./routes/user.js";
import { blogRouter } from "./routes/blog.js";

// Using routes
app.use("/api", userRouter);
app.use("/api", blogRouter);

connectionDb();

const port = process.env.PORT;
app.listen(port || 3000, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
