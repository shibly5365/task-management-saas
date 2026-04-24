import express from "express";
import cors from "cors";
import "express-async-errors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import authRouter from "./routes/auth.js";
import taskRouter from "./routes/tasks.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5030;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://your-app.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
