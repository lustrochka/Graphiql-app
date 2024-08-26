import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Required"),
});