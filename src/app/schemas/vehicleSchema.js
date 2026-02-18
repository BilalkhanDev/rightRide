import * as Yup from "yup";

export const vehicleSchema = Yup.object().shape({
  id: Yup.string()
    .max(25, "ID must be at most 25 characters")
    .required("ID is required"),
  transportationProviderId: Yup.string().required(
    "Transportation Provider ID is required"
  ),
  name: Yup.string().required("Name is required"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  color: Yup.string().required("Color is required"),
  year: Yup.number().required("Year is required"),
  vin: Yup.string().required("VIN is required"),
  licensePlate: Yup.string().required("License Plate is required"),
  licensePlateState: Yup.string()
    .max(2, "State must be 2 characters")
    .required("State is required"),
  credentialingStatus: Yup.string().required(
    "Credentialing Status is required"
  ),
  webhookURL: Yup.string().url("Invalid URL"),
});
