import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import verifyToken from "../middleware/auth";
import { registerValidation } from "../shared/validation";

const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(400).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went Wrong! try later." });
  }
});

router.post("/register", registerValidation, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User(req.body);
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      maxAge: 86400000,
    });
    return res.status(200).json({ message: "User registered Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went Wrong! try later." });
  }
});

export default router;
