import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
import { HotelType } from "../shared/types";
import { upload, uploadImages } from "../shared/uploader";

const router = express.Router();






export default router;
