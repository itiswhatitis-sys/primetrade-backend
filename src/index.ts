import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT, MONGO_URI, CLIENT_URL } from "./config/env";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose.connect(MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
