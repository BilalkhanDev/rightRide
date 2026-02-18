import { Formik } from "formik";
import { clientSchema } from "../../schemas/clientSchema";
import {
  TextField,
  Button,
  IconButton,
  Tooltip,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import { MdClose } from "react-icons/md";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { providerTypes } from "../../../types/clientTypes";

export const ClientForm = ({
  open,
  onClose,
  handleCreateOrEdit,
  clientId,
  clientSecret,
  client = null,
}) => {
  const isEdit = !!client;
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
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? "Edit Client" : "Add New Client"}
          </h2>
          <IconButton
            onClick={onClose}
            className="hover:bg-red-50 hover:text-red-500 transition-colors p-1"
          >
            <MdClose />
          </IconButton>
        </div>

        <Formik
          initialValues={{
            name: client?.name || "",
            clientId: client?.clientId || clientId,
            clientSecret: client?.clientSecret || clientSecret,
            trustedClient: client?.trustedClient ?? true,
            serverURL: client?.serverURL || "",
            provider: client?.provider || "",
            id: client?.id || "",
          }}
          enableReinitialize={true}
          validationSchema={clientSchema}
          validateOnBlur={true}
          onSubmit={(values, { setSubmitting }) => {
            handleCreateOrEdit(values).finally(() => {
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
                  {/* Name */}
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

                  {/* ID */}
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

                  {/* Client ID */}
                  <TextField
                    fullWidth
                    label="Client ID"
                    name="clientId"
                    value={values.clientId}
                    type="password"
                    size="small"
                    disabled
                    onChange={handleChange}
                    error={touched.clientId && Boolean(errors.clientId)}
                    helperText={touched.clientId && errors.clientId}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Copy to clipboard">
                            <IconButton
                              size="small"
                              onClick={() =>
                                navigator.clipboard.writeText(values.clientId)
                              }
                              edge="end"
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Client Secret */}
                  <TextField
                    fullWidth
                    label="Client Secret"
                    name="clientSecret"
                    value={values.clientSecret}
                    type="password"
                    size="small"
                    onChange={handleChange}
                    autoComplete="off"
                    disabled
                    error={touched.clientSecret && Boolean(errors.clientSecret)}
                    helperText={touched.clientSecret && errors.clientSecret}
                    variant="outlined"
                    InputLabelProps={{ shrink: "true" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Copy to clipboard">
                            <IconButton
                              size="small"
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  values.clientSecret
                                )
                              }
                              edge="end"
                            >
                              <ContentCopyIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Provider */}
                  <TextField
                    fullWidth
                    select
                    label="Provider"
                    name="provider"
                    value={values.provider}
                    size="small"
                    onChange={handleChange}
                    error={touched.provider && Boolean(errors.provider)}
                    helperText={touched.provider && errors.provider}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  >
                    {providerTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  {/* Trusted Client */}
                  <TextField
                    fullWidth
                    select
                    label="Trusted Client"
                    name="trustedClient"
                    value={values.trustedClient}
                    size="small"
                    onChange={handleChange}
                    error={
                      touched.trustedClient && Boolean(errors.trustedClient)
                    }
                    helperText={touched.trustedClient && errors.trustedClient}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </TextField>

                  {/* Server URL */}
                  <TextField
                    fullWidth
                    label="Server URL"
                    name="serverURL"
                    value={values.serverURL}
                    size="small"
                    onChange={handleChange}
                    error={touched.serverURL && Boolean(errors.serverURL)}
                    helperText={touched.serverURL && errors.serverURL}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </div>

              {/* Footer Actions */}
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
                  className="hover:bg-primary/80 text-white px-10 py-2 rounded-lg shadow-md hover:shadow-lg transition-all normal-case font-semibold"
                >
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Card>
    </Modal>
  );
};
