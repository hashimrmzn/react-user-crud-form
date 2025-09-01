// src/validationSchema.js
import * as yup from "yup";

export const userSchema = yup.object().shape({
  fname: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters allowed"),

  lname: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Za-z\s]+$/, "Only letters allowed"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Min 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Must contain letters & numbers"),

  phone: yup
    .string() // ✅ better as string to validate digits/length
    .required("A phone number is required")
    .matches(/^\d{8,}$/, "Phone number must be at least 8 digits"),

  userType: yup.string().required("Select user type"),

  gender: yup.string().required("Select gender"),

  userDescription: yup
    .string()
    .required("Description is required")
    .min(5, "Min 5 characters")
    .max(200, "Max 200 characters"),
});
