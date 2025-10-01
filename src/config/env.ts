import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI || "";
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
