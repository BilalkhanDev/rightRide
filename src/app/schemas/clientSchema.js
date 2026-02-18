import * as yup from "yup";

export const clientSchema = yup.object({
  id: yup
    .string()
    .min(24, "ID must be at least 24 characters")
    .required("Required"),

  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Required"),

  clientId: yup
    .string()
    .min(10, "Client ID must be at least 10 characters")
    .required("Required"),

  clientSecret: yup
    .string()
    .min(10, "Client Secret must be at least 10 characters")
    .required("Required"),

  trustedClient: yup.boolean().required("Required"),

  serverURL: yup
    .string()
    .matches(
      /^https?:\/\/(?:localhost|[-a-zA-Z0-9@:%._\+~#=]{1,256}(?:\.[a-zA-Z0-9()]{1,6})\b)(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      "Invalid URL"
    )
    .required("Required"),

  provider: yup.string().required("Required"),
});
