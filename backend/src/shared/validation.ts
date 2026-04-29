import { check } from "express-validator";

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

export { registerValidation, loginValidation };
