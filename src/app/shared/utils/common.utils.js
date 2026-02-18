import { Button } from "@mui/material";

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toISOString().split('T')[0]; // '2026-02-17'
};
export const workflowStatus=['Transport Accepted','Canceled','Completed']

const statusColorMap = {
  "Transport Accepted": "primary",
  "Canceled": "error",
  "Completed": "success",
};

export const formatStatus = (status) => {
  const buttonColor = statusColorMap[status] || null;

  return buttonColor ? (
    <Button
      color={buttonColor}
      variant="contained"
      sx={{ borderRadius: "50px" }}
    >
      {status}
    </Button>
  ) : (
    <Button sx={{ borderRadius: "50px" }} disabled>
      Unknown Status
    </Button>
  );
};




//     switch (status) {
//       case "Transport Accepted":
//         return (
//           <Button
//             variant="outlined"
//             color="primary"
//             sx={{ borderRadius: "50px" }}
//           >
//             status
//           </Button>
//         );
//       case "Cancelled":
//         return (
//           <Button
//             variant="outlined"
//             color="error"
//             sx={{ borderRadius: "50px" }}
//           >
//             status
//           </Button>
//         );
//       case "Completed":
//         return (
//           <Button
//             variant="outlined"
//             color="success"
//             sx={{ borderRadius: "50px" }}
//           >
//             status
//           </Button>
//         );
//       default:
//         return (
//           <Button
//             variant="outlined"
//             sx={{ borderRadius: "50px" }}
//             disabled
//           >
//             Unknown Status
//           </Button>
//         );
//     }
//   };