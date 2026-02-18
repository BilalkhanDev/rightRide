import { Formik } from "formik";
import { driverSchema } from "../../schemas/driverSchema";
import { TextField, Button, IconButton, MenuItem } from "@mui/material";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import { MdClose } from "react-icons/md";
import { credentialingStatus } from "../../../types/driverTypes";

export const DriverForm = ({ open, onClose, handleUpdate, driver = null }) => {
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
          <h2 className="text-xl font-bold text-gray-800">Edit Driver</h2>
          <IconButton
            onClick={onClose}
            className="hover:bg-red-50 hover:text-red-500 transition-colors p-1"
          >
            <MdClose />
          </IconButton>
        </div>

        <Formik
          initialValues={{
            transportationProviderId: driver?.transportationProviderId || "",
            firstName: driver?.firstName || "",
            lastName: driver?.lastName || "",
            phone: driver?.phone || "",
            email: driver?.email || "",
            licenseId: driver?.licenseId || "",
            licenseState: driver?.licenseState || "",
            licenseExpiration: driver?.licenseExpiration || "",
            credentialingStatus: driver?.credentialingStatus || "",
            dob: driver?.dob || "",
            id: driver?.id || "",
          }}
          enableReinitialize={true}
          validationSchema={driverSchema}
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
                    error={
                      touched.id &&
                      Boolean(errors.id)
                    }
                    helperText={
                      touched.id &&
                      errors.id
                    }
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
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    size="small"
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    size="small"
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={values.phone}
                    size="small"
                    onChange={handleChange}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={values.email}
                    size="small"
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="License ID"
                    name="licenseId"
                    value={values.licenseId}
                    size="small"
                    onChange={handleChange}
                    error={touched.licenseId && Boolean(errors.licenseId)}
                    helperText={touched.licenseId && errors.licenseId}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="License State"
                    name="licenseState"
                    value={values.licenseState}
                    size="small"
                    onChange={handleChange}
                    error={touched.licenseState && Boolean(errors.licenseState)}
                    helperText={touched.licenseState && errors.licenseState}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />

                  <TextField
                    fullWidth
                    label="License Expiration"
                    name="licenseExpiration"
                    value={values.licenseExpiration}
                    size="small"
                    onChange={handleChange}
                    error={
                      touched.licenseExpiration &&
                      Boolean(errors.licenseExpiration)
                    }
                    helperText={
                      touched.licenseExpiration && errors.licenseExpiration
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
                    label="DOB"
                    name="dob"
                    value={values.dob}
                    size="small"
                    onChange={handleChange}
                    error={touched.dob && Boolean(errors.dob)}
                    helperText={touched.dob && errors.dob}
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
