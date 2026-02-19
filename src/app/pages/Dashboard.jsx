import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import DataTable from "../components/Table/DataTable";
import { getAllTrips } from "../features/trips/trip.api";
import { DatePicker } from 'antd';
import './dashboard.css'
import { tripColumns } from "../../types/clientTypes";
import { formatDate, formatStatus, workflowStatus } from "../shared/utils/common.utils";
import { debounce } from "lodash";

const Dashboard = () => {
  const { RangePicker } = DatePicker;
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState(false);

  const handleRangeChange = (dates, dateStrings) => {
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange(null);
    }
  };

  const formatTrips = (trips) => {
    return trips?.length && trips?.map((trip) => {
      if (trip.transportDate) {
        trip.transportDate = formatDate(trip.transportDate);
      }
      if (trip?.workflowText) {
        trip.workflowText = formatStatus(trip?.workflowText);
      }
      return trip;
    });
  };

  const fetchTrips = async () => {
    let queryParams = {
      page: page + 1,
      limit: rowsPerPage,
    };
    if (searchTerm  && searchTerm?.trim()?.length > 2) {
      queryParams.search = searchTerm;
    }
    if (statusFilter) {
      queryParams.workflowText = statusFilter;
    }
    if (dateRange) {
      queryParams.startDate = dateRange[0]?.toISOString() || null;
      queryParams.endDate = dateRange[1]?.toISOString() || null;
    }

    try {
      setLoading(true);
      const result = await getAllTrips(queryParams);
      const formattedTrips = formatTrips(result?.data || []);
      setTrips(formattedTrips || []);
      setTotalCount(result?.totalResults);
      setLoading(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search input and reset when cleared
  const handleSearch = (e) => {
    searchRef.current = true;
    const { value } = e.target;
    setSearchTerm(value);
  };

  const debouncedFetchTrips = useCallback(
    debounce(() => fetchTrips(), 500), 
    [searchTerm, page, rowsPerPage, dateRange]
  );

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      debouncedFetchTrips();
    }
  }, [searchTerm, page, rowsPerPage, dateRange, debouncedFetchTrips]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setDateRange(null);
    setPage(0);
  };

  const isDisabled = !searchTerm && !statusFilter && !dateRange;

  return (
    <div className="px-6">
      <div className="flex items-center gap-4 mb-2">
        {/* Search input */}
        <TextField
          label="Search"
          variant="outlined"
          type="search"
          size="small"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Status filter dropdown */}
        <FormControl variant="outlined" sx={{ minWidth: 150 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {workflowStatus?.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <RangePicker
          value={dateRange}
          allowClear={true}
          onChange={handleRangeChange}
        />
        {/* Reset Filters Button */}
        <Button
          variant="outlined"
          onClick={handleResetFilters}
          color="primary"
          size="small"
          disabled={isDisabled}
        >
          Reset Filters
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          columns={tripColumns}
          rows={trips}
          loading={loading}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default Dashboard;
