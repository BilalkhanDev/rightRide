import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  TablePagination,
  Skeleton,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#136F63",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1E40AF",
    },
    accent: {
      main: "#38BDF8",
    },
  },
});

const DataTable = ({
  columns,
  rows,
  onEdit,
  loading,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const skeletonRows = 50; // Set minimum skeleton rows to 50

  return (
    <ThemeProvider theme={muiTheme}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                height: "2.5rem",
                backgroundColor: "primary.main",
              }}
            >
              {columns.map((col) => (
                <TableCell
                  sx={{
                    color: "primary.contrastText",
                    fontWeight: 600,
                    width: col.width,
                    whiteSpace: "nowrap",
                    padding: "15px",
                  }}
                  key={col.field}
                >
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              // Render skeleton rows while loading
              Array.from({ length: skeletonRows }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      align={col.align ?? "left"}
                      sx={{
                        whiteSpace: "nowrap",
                        padding: "15px",
                        fontSize: "16px",
                      }}
                    >
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={30} // Row height for skeleton
                     
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              rows?.map((row, index) => (
                <TableRow key={row._id || index}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.field}
                      align={col.align ?? "left"}
                      width={col.width}
                      sx={{
                        whiteSpace: "nowrap",
                        padding: "15px",
                        fontSize: "16px",
                      }}
                    >
                      {col.renderCell
                        ? col.renderCell(row, onEdit)
                        : row[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100]}
        component="div"
        count={totalCount || 0}
        rowsPerPage={rowsPerPage}
        page={page || 0}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </ThemeProvider>
  );
};

export default DataTable;
