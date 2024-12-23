"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import Sidebar from "../SideNav"; // Adjust the path to where the Sidebar component is located
import PrintPage from "../print/page";
import { time } from "console";
import {
  AppBar,
  Toolbar,
} from "@mui/material";

interface RecordEntry {
  id: string;
  role: string;
  country: string;
  state: string;
  latitude: string;
  longitude: string;
  check_in: string;
  check_out: string;
}

const HistoryPage: React.FC = () => {
  const [records, setRecords] = useState<RecordEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [filteredRecords, setFilteredRecords] = useState<RecordEntry[]>([]);
  const [expanded, setExpanded] = useState(false); // For sidebar toggle
  const [showSideNav, setShowSideNav] = useState(false);

  const [open, setOpen] = useState(false); // Controls the visibility of the popup
  const [currentRecord, setCurrentRecord] = useState(null); // Stores the current record being updated
  const [remark, setRemark] = useState(""); // Stores the entered remark
  const handleOpen = (record) => {
    setCurrentRecord(record);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRemark("");
  };
  const handleSubmit = () => {
    if (currentRecord) {
      const currentTime = dayjs().toISOString();
      setFilteredRecords((prevRecords) =>
        prevRecords.map((rec) =>
          rec.id === currentRecord.id
            ? { ...rec, check_out: currentTime, remark }
            : rec
        )
      );
      setOpen(false);
      setRemark("");
    }
  };
  

  // Fetch data from API
  useEffect(() => {
    axios
      .get("https://6719d8f0acf9aa94f6a80839.mockapi.io/users")
      .then((res) => setRecords(res.data))
      .catch((error) => console.error("Error fetching data:", error));
    console.log();
  }, []);

  // Filter records based on selected date
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.format("DD/MM/YYYY");
      const filtered = records.filter(
        (record) =>
          dayjs(record.check_in).format("DD/MM/YYYY") === formattedDate
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records); // Show all records if no date is selected
    }
  }, [selectedDate, records]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        {/* Sidebar */}
        <Sidebar expanded={expanded} setExpanded={setExpanded} />

        <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: showSideNav ? "240px" : "64px",
          transition: "margin 0.3s ease",
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#3498db", marginBottom: 2 }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center", color: "#ecf0f1" }}
            >
              History Records
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            ml: { xs: 0, md: expanded ? "240px" : "64px" }, // Sidebar adjustment
            mt: { xs: "56px", md: 0 }, // Top margin for mobile
            transition: "margin 0.3s ease",
            backgroundColor: "#f4f6f8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3, // Margin bottom for spacing
              width: "100%",
              maxWidth: "1100px", // Adjust the container width as needed
            }}
          >
            {/* Left: History Records Label */}
            {/* <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                color: "#2c3e50",
                flex: 1, // Adjust spacing
              }}
            >
              History Records
            </Typography> */}

            {/* Right: Date Picker */}
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              format="DD/MM/YYYY"
              sx={{
                width: { xs: "60%", md: "40%" }, // Adjust width for responsiveness
                ".MuiInputBase-root": {
                  fontSize: { xs: "0.875rem", md: "1rem" },
                },
              }}
            />
          </Box>
          {/* <PrintPage tableData={records} /> */}
          {/* Data Table */}
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              maxWidth: "1200px",
              boxShadow: 3,
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Latitude",
                    "Longitude",
                    "State",
                    "Country",
                    "Check In",
                    "Check Out",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        backgroundColor: "#3498db",
                        color: "#ffffff",
                        fontSize: { xs: "0.8rem", md: "1rem" },
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.latitude}</TableCell>
                    <TableCell>{record.longitude}</TableCell>
                    <TableCell>{record.state}</TableCell>
                    <TableCell>{record.country}</TableCell>
                    <TableCell>
                      {dayjs(record.check_in).isValid()
                        ? dayjs(record.check_in).format("DD/MM/YYYY HH:mm:ss")
                        : "Invalid Date"}
                    </TableCell>
                    <TableCell>
                      {record.check_out ? (
                        <>
                          {dayjs(record.check_out).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )}
                          <Typography
                            variant="body2"
                            sx={{ color: "gray", mt: 1 }}
                          >
                            Remark: {record.remark}
                          </Typography>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpen(record)}
                        >
                          Check Out
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Popup Modal */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add Remark
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter your remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!remark.trim()}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Modal>

          {/* </TableContainer> */}
        </Box>
      </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default HistoryPage;
