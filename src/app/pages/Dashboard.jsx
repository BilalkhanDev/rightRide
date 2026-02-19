import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import DataTable from "../components/Table/DataTable";
import { getAllTrips } from "../features/trips/trip.api";
import { DatePicker} from 'antd';
import './dashboard.css'
import { tripColumns } from "../../types/clientTypes";
import { formatDate, formatStatus, workflowStatus } from "../shared/utils/common.utils";
import { debounce } from "lodash";
const Dashboard=()=> {
  const { RangePicker } = DatePicker;
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalCount, setTotalCount] = useState(0);

  const [filter, setFilter] = useState({
    search:"",
    statusFilter:""
  });
  const [dates, setDates] = useState({
    startDate: "",
    endDate: ""
  })
  const [dateRange, setDateRange] = useState(null);

  const handleRangeChange = (dates, dateStrings) => {
    // dates will be null if the clear icon is used
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange(null); // Or setDateRange([]);
    }
  };

  console.log(dateRange)

  const formatTrips = (trips) => {
    return trips?.length && trips?.map((trip) => {
      if (trip.transportDate) {
        trip.transportDate = formatDate(trip.transportDate);
      }
      if(trip?.workflowText){
        trip.workflowText=formatStatus(trip?.workflowText)
      }
      return trip;
    });
  };

  const fetchTrips = async () => {
    let queryParams = {
      page: page + 1,
      limit: rowsPerPage,
    }
    if (filter?.search) {
      queryParams.search = filter?.search
    }
    if (filter?.statusFilter) {
      queryParams.workflowText = filter?.statusFilter
    }
    if(dateRange){
      queryParams.startDate=dateRange[0]?.toISOString() || null
      queryParams.endDate=dateRange[1]?.toISOString()  || null
    }

    try {
      setLoading(true);
      const result = await getAllTrips(queryParams);
      const formattedTrips = formatTrips(result?.data || [])
      setTrips(formattedTrips || []);
      setTotalCount(result?.totalResults);
      setLoading(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const delay = filter?.search && filter?.search?.trim()?.length > 2 ? 500 : 0;

    const timer = setTimeout(() => {
      fetchTrips();
    }, delay);

    return () => clearTimeout(timer);
  }, [page, rowsPerPage, filter, dateRange]);


  const handleFilter=(e)=>{
    const {name, value}=e.target

    setFilter((prev)=>({
      ...prev,
    [name]:value
    }))
  }
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setFilter({
    search:"",
    statusFilter:""
    });
    setDateRange(null)
    setPage(0);
  };
const isDisabled=!filter?.search && !filter?.statusFilter && !dateRange
  return (
    <div className="px-6">
      <div className="flex  items-center gap-4 mb-2">
        {/* Search input */}
        <TextField
          label="Search"
          variant="outlined"
          type="search"
          size="small"
          name="search"
          value={filter?.search}
          onChange={handleFilter}
          // className="mr-4"
        />
        
        {/* Status filter dropdown */}
        <FormControl variant="outlined" sx={{minWidth: 150}} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="statusFilter"
            value={filter?.statusFilter}
            onChange={handleFilter}
        
          >
            <MenuItem value="">All</MenuItem>
            {workflowStatus?.map((option, index)=>{
              return  <MenuItem key={index} value={option}>{option}</MenuItem>
            })}
          </Select>
        </FormControl>
        <RangePicker
          id={{
            start: 'startInput',
            end: 'endInput',
          }}  
          value={dateRange} 
 
          allowClear={true}

          onChange={handleRangeChange}

        />
        {/* Reset Filters Button */}
        <Button
          variant="outlined"
          style={{cursor:'pointer'}}
          onClick={handleResetFilters}
          color="primary"
          size="small"
          disabled={isDisabled || false}
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
}
export default Dashboard