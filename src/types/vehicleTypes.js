import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const vehicleColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "transportationProviderId",
    headerName: "Transportation Provider ID",
    width: 150,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "make",
    headerName: "Make",
    width: 100,
  },
  {
    field: "model",
    headerName: "Model",
    width: 100,
  },
  {
    field: "color",
    headerName: "Color",
    width: 100,
  },
  {
    field: "year",
    headerName: "Year",
    width: 100,
  },
  {
    field: "vin",
    headerName: "VIN",
    width: 100,
  },
  {
    field: "licensePlate",
    headerName: "License Plate",
    width: 100,
  },
  {
    field: "licensePlateState",
    headerName: "LP State",
    width: 100,
  },
  {
    field: "credentialingStatus",
    headerName: "Credentialing Status",
    width: 100,
  },
  {
    field: "webhookURL",
    headerName: "Webhook URL",
    width: 100,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    align: "center",
    renderCell: (row, onEdit) => (
      <Tooltip title="Edit">
        <IconButton
          size="small"
          onClick={() => onEdit && onEdit(row)}
          className="text-primary hover:bg-primary/10"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    ),
  },
];

export const credentialingStatus = [
  { value: "credentialed", label: "Credentialed" },
  { value: "pending", label: "Pending" },
  { value: "disqualified", label: "Disqualified" },
];
