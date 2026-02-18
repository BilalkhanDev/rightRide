import { useState, useEffect, useCallback } from "react";
import { getAllDrivers, updateDriver } from "../features/drivers/driver.api";
import { toast } from "../components/Toast/Toast";
import DataTable from "../components/Table/DataTable";
import { driverColumns } from "../../types/driverTypes";
import { DriverForm } from "../shared/forms/driverForm";
import { TextField } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const fetchDrivers = useCallback(() => {
    setLoading(true);

    getAllDrivers({
      page: page + 1,
      limit: rowsPerPage,
      ...(searchText ? { search: searchText } : {}),
    })
      .then((res) => {
        setDrivers(res.data);
        setTotalCount(res.totalResults);
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Failed to fetch drivers");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, rowsPerPage, searchText]);

  //fetch drivers with search
  useEffect(() => {
    const delay = searchText ? 500 : 0;

    const timer = setTimeout(() => {
      fetchDrivers();
    }, delay);

    return () => clearTimeout(timer);
  }, [searchText, rowsPerPage, fetchDrivers]);


  const handleUpdate = async (values) => {
    try {
      await updateDriver(selectedDriver._id, values);
      toast.success("Driver updated successfully");
      setEditModalOpen(false);
      fetchDrivers();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update driver");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = async (event) => {
    setSearchText(event.target.value);
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setEditModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-start items-center mb-2">
        <TextField
          variant="outlined"
          size="small"
          placeholder="search by name"
          onChange={handleSearchChange}
        />
      </div>
      <DataTable
        columns={driverColumns}
        rows={drivers}
        loading={loading}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onEdit={handleEdit}
      />

      <DriverForm
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        handleUpdate={handleUpdate}
        driver={selectedDriver}
      />
    </div>
  );
}
