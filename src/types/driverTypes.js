import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const driverColumns = [
  {
    field: "id",
    headerName: "ID",
    align: "left",
    width: 90,
  },
  {
    field: "transportationProviderId",
    headerName: "Transportation Provider ID",
    width: 150,
    align: "center",
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 120,
    align: "center",
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 120,
    align: "center",
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
    align: "center",
  },
  {
    field: "email",
    headerName: "Email",
    width: 100,
    align: "left",
  },
  {
    field: "licenseId",
    headerName: "License ID",
    width: 100,
    align: "center",
  },
  {
    field: "licenseState",
    headerName: "License State",
    width: 50,
    align: "center",
  },
  {
    field: "licenseExpiration",
    headerName: "License Exp. Date",
    width: 100,
    align: "center",
  },
  {
    field: "credentialingStatus",
    headerName: "Credentialing Status",
    width: 100,
    align: "center",
  },
  {
    field: "dob",
    headerName: "DOB",
    width: 100,
    align: "left",
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