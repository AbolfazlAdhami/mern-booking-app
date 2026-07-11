import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { HotelType } from "../shared/types";
import { upload, uploadImages } from "../shared/uploader";
import { createHotelValidation } from "../shared/validation";

const router = express.Router();

router.post("/", verifyToken, createHotelValidation, upload.array("imageFiles", 6), async (req: Request, res: Response) => {
  try {
    const imagesFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const imagesUrls = await uploadImages(imagesFiles);

    newHotel.imageUrls = imagesUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    return res.status(201).send(newHotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    return res.json(hotels);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    return res.json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.put("/:hotelId", verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotelId = req.params.hotelId.toString();

    const hotel = await Hotel.findByIdAndUpdate(
      {
        _id: hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true },
    );

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const files = req.files as Express.Multer.File[];
    const updateImageUrls = await uploadImages(files);

    hotel.imageUrls = [...updateImageUrls, ...(updateImageUrls || [])];

    await hotel.save();
    return res.status(201).json(hotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;


//  TODO: This route done but Check Test
