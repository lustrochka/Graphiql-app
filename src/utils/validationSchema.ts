import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[!@#$%^&*()+=._-]/,
      "Password must contain at least one special character",
    )
    .matches(/^\S*$/, "Password must not contain spaces")
    .required("Password is required"),
});
