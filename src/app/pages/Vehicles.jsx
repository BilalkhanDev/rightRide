import { useState, useEffect, useCallback } from "react";
import {
  getAllVehicles,
  updateVehicle,
} from "../features/vehicles/vehicles.api";
import { toast } from "../components/Toast/Toast";
import DataTable from "../components/Table/DataTable";
import { vehicleColumns } from "../../types/vehicleTypes";
import { VehicleForm } from "../shared/forms/vehicleForm";
import { TextField } from "@mui/material";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const fetchVehicles = useCallback(() => {
    setLoading(true);
    getAllVehicles({
      page: page + 1,
      limit: rowsPerPage,
      ...(searchText ? { search: searchText } : {}),
    })
      .then((res) => {
        setVehicles(res.data);
        setTotalCount(res.totalResults);
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Failed to fetch vehicles");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, rowsPerPage, searchText]);

  useEffect(() => {
    const delay = searchText ? 500 : 0;

    const timer = setTimeout(() => {
      fetchVehicles();
    }, delay);

    return () => clearTimeout(timer);
  }, [searchText, rowsPerPage, fetchVehicles]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setEditModalOpen(true);
  };

  const handleUpdate = async (values) => {
    try {
      await updateVehicle(selectedVehicle._id, values);
      toast.success("Vehicle updated successfully");
      setEditModalOpen(false);
      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update vehicle");
    }
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
        columns={vehicleColumns}
        rows={vehicles}
        onEdit={handleEdit}
        loading={loading}
        totalCount={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <VehicleForm
        open={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        handleUpdate={handleUpdate}
        vehicle={selectedVehicle}
      />
    </div>
  );
}
