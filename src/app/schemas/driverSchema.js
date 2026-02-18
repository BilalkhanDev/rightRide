import * as Yup from "yup";

export const driverSchema = Yup.object().shape({
  id: Yup.string().max(25, "ID must be at most 25 characters").required("ID is required"),
  transportationProviderId: Yup.string().required(
    "Transportation Provider ID is required"
  ),
  firstName: Yup.string().max(50, "First Name must be at most 50 characters").required("First Name is required"),
  lastName: Yup.string().max(50, "Last Name must be at most 50 characters").required("Last Name is required"),
  phone: Yup.string().max(12, "Phone must be at most 12 characters").required("Phone is required"),
  email: Yup.string().email("Invalid email").max(254, "Email must be at most 254 characters").required("Email is required"),
  licenseId: Yup.string().max(15, "License ID must be at most 15 characters").required("License ID is required"),
  licenseState: Yup.string().max(2, "License State must be at most 2 characters").required("License State is required"),
  licenseExpiration: Yup.string().required("License Expiration is required"),
  credentialingStatus: Yup.string().max(25, "Credentialing Status must be at most 25 characters").required(
    "Credentialing Status is required"
  ),
  dob: Yup.string().required("DOB is required"),
});
