import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
