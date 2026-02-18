import { Chip, Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const clientColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "clientId",
    headerName: "Client ID",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "clientSecret",
    headerName: "Client Secret",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "serverURL",
    headerName: "Server URL",
    width: 110,
    editable: true,
  },
  {
    field: "providerLabel",
    headerName: "Provider",
    width: 150,
    editable: true,
  },
  {
    field: "trustedClient",
    headerName: "Trusted",
    renderCell: (row) => (
      <Chip
        label={row.trustedClient ? "Yes" : "No"}
        color={row.trustedClient ? "success" : "default"}
        size="small"
      />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
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

export const tripColumns = [
  {
    field: "transportDate",
    headerName: "Transport Date",
      
  },
  {
    field: "orderId",
    headerName: "Order ID",
   
  },
  {
    field: "ticketId",
    headerName: "Ticket ID",
     width: 100,
   
   
  },
  {
    field: "name",
    headerName: "Name",
   
  },
  {
    field: "firstName",
    headerName: "First Name",
   
  },
  {
    field: "lastName",
    headerName: "Last Name",
   
  },
  {
    field: "orderStatus",
    headerName: "Order Status",
   
  },
  {
    field: "workflow",
    headerName: "Workflow",
   
  },
  {
    field: "externalId",
    headerName: "External ID",
   
  },
  {
    field: "transProvider",
    headerName: "Transport Provider",
   
  },
  {
    field: "actionComments",
    headerName: "Action Comments",
   
  },
  {
    field: "actionBy",
    headerName: "Action By",
   
  },
  {
    field: "actionTimestamp",
    headerName: "Action Timestamp",
   
  },
  {
    field: "estTransEnd",
    headerName: "Estimated End Time",
   
  },
  {
    field: "workflowText",
    headerName: "Workflow Text",
   
  },
  {
    field: "siteCode",
    headerName: "Site Code",
   
  },
  {
    field: "changedDate",
    headerName: "Changed Date",
   
  },
  {
    field: "apptTime",
    headerName: "Appointment Time",
   
  },
  {
    field: "personId",
    headerName: "Person ID",
   
  },
  {
    field: "personCreated",
    headerName: "Person Created",
   
  },
  {
    field: "driverId",
    headerName: "Driver ID",
   
  },
  {
    field: "statusType",
    headerName: "Status Type",
   
  },
  {
    field: "estMiles",
    headerName: "Estimated Miles",
   
  },
  {
    field: "puTime",
    headerName: "Pickup Time",
   
  },
  {
    field: "doTime",
    headerName: "Drop-off Time",
   
  },
  {
    field: "healthcarePlan",
    headerName: "Healthcare Plan",
   
  },
  {
    field: "benefitPlan",
    headerName: "Benefit Plan",
   
  },
  {
    field: "organization",
    headerName: "Organization",
   
  },
  {
    field: "programCode",
    headerName: "Program Code",
   
  },
  {
    field: "pickupNotes",
    headerName: "Pickup Notes",
   
  },
  {
    field: "returnNotes",
    headerName: "Return Notes",
   
  },
  {
    field: "puAddress",
    headerName: "Pickup Address",
   
  },
  {
    field: "puCity",
    headerName: "Pickup City",
   
  },
  {
    field: "puState",
    headerName: "Pickup State",
   
  },
  {
    field: "puZip",
    headerName: "Pickup Zip",
   
  },
  {
    field: "doAddress",
    headerName: "Drop-off Address",
   
  },
  {
    field: "doCity",
    headerName: "Drop-off City",
   
  },
  {
    field: "doState",
    headerName: "Drop-off State",
   
  },
  {
    field: "doZip",
    headerName: "Drop-off Zip",
   
  },
  {
    field: "authorizationCode",
    headerName: "Authorization Code",
   
  },
  {
    field: "ovrDriverName",
    headerName: "Overridden Driver Name",
   
  },
  {
    field: "ovrDriverId",
    headerName: "Overridden Driver ID",
   
  },
  {
    field: "ovrVin",
    headerName: "Overridden VIN",
   
  },
  {
    field: "ovrTripMiles",
    headerName: "Overridden Trip Miles",
   
  },
  {
    field: "ovrPuOdometer",
    headerName: "Overridden Pickup Odometer",
   
  },
  {
    field: "ovrDoOdometer",
    headerName: "Overridden Drop-off Odometer",
   
  },
  {
    field: "ovrTos",
    headerName: "Overridden TOS",
   
  },
  {
    field: "ovrTad",
    headerName: "Overridden TAD",
   
  },
  {
    field: "ovrPuTls",
    headerName: "Overridden Pickup TLS",
   
  },
  {
    field: "ovrDoTls",
    headerName: "Overridden Drop-off TLS",
   
  },
  {
    field: "ovrBilledDate",
    headerName: "Overridden Billed Date",
   
  },
  {
    field: "aorr",
    headerName: "AORR",
   
  },
  {
    field: "fullCount",
    headerName: "Full Count",
    width: 150,
   
  },
];




export const providerTypes = [
  {
    value: "modivcare",
    label: "Modivcare",
  },
  {
    value: "iehp",
    label: "IEHP",
  },
  {
    value: "ctc",
    label: "Call the Car",
  },
  {
    value: "phpca",
    label: "PHPCA",
  },
  {
    value: "rippling",
    label: "Rippling",
  },
  {
    value: "mtm",
    label: "MTM",
  },
];
