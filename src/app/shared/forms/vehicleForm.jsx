import { Formik } from "formik";
import { vehicleSchema } from "../../schemas/vehicleSchema";
import { TextField, Button, IconButton, MenuItem } from "@mui/material";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import { MdClose } from "react-icons/md";
import { credentialingStatus } from "../../../types/vehicleTypes";

export const VehicleForm = ({
  open,
  onClose,
  handleUpdate,
  vehicle = null,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center p-4 backdrop-blur-sm bg-black/40"
      closeAfterTransition
    >
      <Card className="w-full max-w-2xl overflow-hidden rounded-xl shadow-2xl bg-white border-0 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center bg-gray-50/30 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Edit Vehicle</h2>
          <IconButton
            onClick={onClose}
            className="hover:bg-red-50 hover:text-red-500 transition-colors p-1"
          >
            <MdClose />
          </IconButton>
        </div>

        <Formik
          initialValues={{
            id: vehicle?.id || "",
            transportationProviderId: vehicle?.transportationProviderId || "",
            name: vehicle?.name || "",
            make: vehicle?.make || "",
            model: vehicle?.model || "",
            color: vehicle?.color || "",
            year: vehicle?.year || "",
            vin: vehicle?.vin || "",
            licensePlate: vehicle?.licensePlate || "",
            licensePlateState: vehicle?.licensePlateState || "",
            credentialingStatus: vehicle?.credentialingStatus || "",
            webhookURL: vehicle?.webhookURL || "",
          }}
          enableReinitialize={true}
          validationSchema={vehicleSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleUpdate(values).finally(() => {
              setSubmitting(false);
            });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 overflow-hidden"
            >
              <div className="p-8 space-y-8 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <TextField
                    fullWidth
                    label="ID"
                    name="id"
                    value={values.id}
                    size="small"
                    onChange={handleChange}
                    error={touched.id && Boolean(errors.id)}
                    helperText={touched.id && errors.id}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Transportation Provider ID"
                    name="transportationProviderId"
                    value={values.transportationProviderId}
                    size="small"
                    onChange={handleChange}
                    error={
                      touched.transportationProviderId &&
                      Boolean(errors.transportationProviderId)
                    }
                    helperText={
                      touched.transportationProviderId &&
                      errors.transportationProviderId
                    }
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={values.name}
                    size="small"
                    onChange={handleChange}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Make"
                    name="make"
                    value={values.make}
                    size="small"
                    onChange={handleChange}
                    error={touched.make && Boolean(errors.make)}
                    helperText={touched.make && errors.make}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Model"
                    name="model"
                    value={values.model}
                    size="small"
                    onChange={handleChange}
                    error={touched.model && Boolean(errors.model)}
                    helperText={touched.model && errors.model}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Color"
                    name="color"
                    value={values.color}
                    size="small"
                    onChange={handleChange}
                    error={touched.color && Boolean(errors.color)}
                    helperText={touched.color && errors.color}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Year"
                    name="year"
                    value={values.year}
                    size="small"
                    onChange={handleChange}
                    error={touched.year && Boolean(errors.year)}
                    helperText={touched.year && errors.year}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="VIN"
                    name="vin"
                    value={values.vin}
                    size="small"
                    onChange={handleChange}
                    error={touched.vin && Boolean(errors.vin)}
                    helperText={touched.vin && errors.vin}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="License Plate"
                    name="licensePlate"
                    value={values.licensePlate}
                    size="small"
                    onChange={handleChange}
                    error={touched.licensePlate && Boolean(errors.licensePlate)}
                    helperText={touched.licensePlate && errors.licensePlate}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="License Plate State"
                    name="licensePlateState"
                    value={values.licensePlateState}
                    size="small"
                    onChange={handleChange}
                    error={
                      touched.licensePlateState &&
                      Boolean(errors.licensePlateState)
                    }
                    helperText={
                      touched.licensePlateState && errors.licensePlateState
                    }
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    select
                    label="Credentialing Status"
                    name="credentialingStatus"
                    value={values.credentialingStatus}
                    size="small"
                    onChange={handleChange}
                    error={
                      touched.credentialingStatus &&
                      Boolean(errors.credentialingStatus)
                    }
                    helperText={
                      touched.credentialingStatus && errors.credentialingStatus
                    }
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  >
                    {credentialingStatus.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    label="Webhook URL"
                    name="webhookURL"
                    value={values.webhookURL}
                    size="small"
                    onChange={handleChange}
                    error={touched.webhookURL && Boolean(errors.webhookURL)}
                    helperText={touched.webhookURL && errors.webhookURL}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/30">
                <Button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 normal-case font-semibold rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  className="bg-[#136F63] hover:bg-[#136F63]/80 text-white px-10 py-2 rounded-lg shadow-md hover:shadow-lg transition-all normal-case font-semibold"
                >
                  Update
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Card>
    </Modal>
  );
};
