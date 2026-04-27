import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import { constructSearchQuery } from "../shared/utils";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);
  } catch (error) {}
});

router.get("/", async (req: Request, res: Response) => {});

router.get("/:id", async (req: Request, res: Response) => {});

router.post("/:hotelId/bookings/payment-intent", verifyToken, async (req: Request, res: Response) => {});

router.post("/:hotelId/bookings", async (req: Request, res: Response) => {});
