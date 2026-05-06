import { body, check } from "express-validator";

const registerValidation = [
  check("firstName", "First Name is Required!").isString(),
  check("lastName", "Last Name is Required!").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({ min: 8 }),
];

const loginValidation = [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

const createHotelValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
  body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
];

export { registerValidation, loginValidation, createHotelValidation };
