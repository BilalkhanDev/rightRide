import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),

  password: Yup.string().required("Required"),
});

export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required"),

  email: Yup.string().email("Invalid email address").required("Required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
