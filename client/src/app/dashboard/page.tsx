"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Switch,
  FormControl,
  FormLabel,
  Input,
  Card,
  Grid,
  Select,
  Option,
  CardContent,
  Skeleton,
} from "@mui/joy";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useGeolocated } from "react-geolocated";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { title } from "process";
interface RecordEntry {
  role: string;
  country: string;
  state: string;
  latitude: string;
  longitude: string;
  checkIn: string;
  checkOut: string;
}

export default function Component() {
  const [role, setRole] = useState<string>("nurse");
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [isNewSession, setIsNewSession] = useState<boolean>(false);
  const [records, setRecords] = useState<RecordEntry[]>([]);
  const [locationInfo, setLocationInfo] = useState({ country: "", state: "" });
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [sessionLocked, setSessionLocked] = useState<boolean>(false);
  const [coordsState, setCoordsState] = useState({
    latitude: "",
    longitude: "",
  });
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });

  useEffect(() => {
    if (locationEnabled && coords) {
      const fetchLocationDetails = async () => {
        setLoadingLocation(true);
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const { address } = response.data;
          setLocationInfo({
            country: address.country || "N/A",
            state: address.state || "N/A",
          });
          setCoordsState({
            latitude: coords.latitude.toString(),
            longitude: coords.longitude.toString(),
          });
        } catch (error) {
          console.error("Error fetching location data:", error);
          setLocationInfo({ country: "Error", state: "Error" });
        } finally {
          setLoadingLocation(false);
        }
      };
      fetchLocationDetails();
    } else {
      setLocationInfo({ country: "", state: "" });
      setCoordsState({ latitude: "", longitude: "" });
    }
  }, [locationEnabled, coords]);

  const handleNewSession = () => {
    setIsNewSession(true);
    setSessionLocked(true);
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleSave = () => {
    if (checkInDate && checkOutDate && coords) {
      const newRecord: RecordEntry = {
        role,
        country: locationInfo.country,
        state: locationInfo.state,
        latitude: coords.latitude.toString(),
        longitude: coords.longitude.toString(),
        checkIn: checkInDate.format("DD/MMM/YYYY hh:mm A"),
        checkOut: checkOutDate.format("DD/MMM/YYYY hh:mm A"),
      };
      setRecords((prevRecords) => [...prevRecords, newRecord]);
      setIsNewSession(false);
      setSessionLocked(false);
      setCheckInDate(null);
      setCheckOutDate(null);
    }
  };

  const handleLocationToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationEnabled(event.target.checked);
    setIsNewSession(false);
  };

  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  const handleNextPage = () =>
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(records.length / rowsPerPage) - 1)
    );

  const currentRecords = records.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const [mydata, setMydata] = useState([]);
  useEffect(() => {
    axios
      .get("https://6719d8f0acf9aa94f6a80839.mockapi.io/users")
      .then((res) => setMydata(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{ flexGrow: 1, backgroundColor: "#f0f4f8", alignContent: "center" }}
      >
        <AppBar
          position="static"
          sx={{ backgroundColor: "#3498db", marginBottom: 2 }}
        >
          <Toolbar>
            <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
              <Select
                value={role}
                onChange={(_, newValue) => setRole(newValue as string)}
                sx={{
                  height: 40,
                  fontSize: "1rem",
                  backgroundColor: "#ecf0f1",
                  color: "#2c3e50",
                  "& .MuiSelect-icon": { color: "#2c3e50" },
                }}
              >
                <Option value="nurse">Nurse</Option>
                <Option value="doctor">Doctor</Option>
                <Option value="admin">Admin</Option>
                <Option value="other">Other</Option>
              </Select>
            </FormControl>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center", color: "#ecf0f1" }}
            >
              Check-In & Check-Out
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: "#ecf0f1" }}
            >
              Role: {role.charAt(0).toUpperCase() + role.slice(1)}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            padding: { xs: 2, md: 4 },
            backgroundColor: "#ecf0f1",
            borderRadius: 2,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              padding: 2,
              mb: 4,
              borderColor: "#3498db",
              boxShadow: 3,
              backgroundColor: "#ffffff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                mb: { xs: 2, md: 4 },
              }}
            >
              <Button
                variant="contained"
                onClick={handleNewSession}
                disabled={sessionLocked || !locationEnabled}
                sx={{
                  backgroundColor: "#27ae60",
                  mr: { xs: 1, md: 2 },
                  mb: { xs: 1, md: 0 },
                  padding: { xs: "6px 12px", md: "8px 16px" },
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  "&:hover": { backgroundColor: "#2ecc71" },
                }}
              >
                New Session
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!checkInDate || !checkOutDate}
                sx={{
                  mr: { xs: 1, md: 2 },
                  mb: { xs: 1, md: 0 },
                  backgroundColor: "#e74c3c",
                  padding: { xs: "6px 12px", md: "8px 16px" },
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  "&:hover": { backgroundColor: "#c0392b" },
                }}
              >
                Save
              </Button>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <FormLabel>Enable Location</FormLabel>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Switch
                      checked={locationEnabled}
                      onChange={handleLocationToggle}
                      sx={{ ml: 2 }}
                    />
                  </Box>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <FormLabel>Location</FormLabel>
                  <Input
                    value={`${locationInfo.state} , ${locationInfo.country}`}
                    readOnly
                    placeholder="Location"
                    sx={{ height: 55, fontSize: "1rem", width: "100%" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <FormLabel>Latitude</FormLabel>
                  <Input
                    value={coordsState.latitude}
                    readOnly
                    placeholder="Latitude"
                    sx={{ height: 55, fontSize: "1rem", width: "100%" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <FormLabel>Longitude</FormLabel>
                  <Input
                    value={coordsState.longitude}
                    readOnly
                    placeholder="Longitude"
                    sx={{ height: 55, fontSize: "1rem", width: "100%" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <FormLabel>Check-In</FormLabel>
                  <DateTimePicker
                    value={checkInDate}
                    onChange={(newValue) => setCheckInDate(newValue)}
                    disabled={!isNewSession}
                    sx={{ height: 40, fontSize: "1rem", width: "100%" }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <FormLabel>Check-Out</FormLabel>
                  <DateTimePicker
                    value={checkOutDate}
                    onChange={(newValue) => setCheckOutDate(newValue)}
                    disabled={!checkInDate}
                    sx={{ height: 40, fontSize: "1rem", width: "100%" }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Card>

          {records.length > 0 && (
            <Card
              variant="outlined"
              sx={{
                padding: 2,
                mt: 4,
                borderColor: "#3498db",
                boxShadow: 3,
                backgroundColor: "#ffffff",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                align="center"
                sx={{ color: "#2c3e50" }}
              >
                History
              </Typography>

              <Box sx={{ overflowX: "auto", width: "100%" }}>
                <Table sx={{ minWidth: 600, width: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColor: "#3498db", color: "#ffffff" }}
                      >
                        Role
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#3498db", color: "#ffffff" }}
                      >
                        Country
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#3498db", color: "#ffffff" }}
                      >
                        State
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#3498db", color: "#ffffff" }}
                      >
                        Latitude
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#3498db", color: "#ffffff" }}
                      >
                        Longitude
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#3498db", color: "#ffffff" }}
                      >
                        Check In
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#3498db", color: "#ffffff" }}
                      >
                        Check Out
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRecords.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.role}</TableCell>
                        <TableCell>{record.country}</TableCell>
                        <TableCell>{record.state}</TableCell>
                        <TableCell>{record.latitude}</TableCell>
                        <TableCell>{record.longitude}</TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>{record.checkOut}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableBody>
                    {mydata.map((post) => {
                      const {
                        id,
                        role,
                        country,
                        state,
                        latitude,
                        longitude,
                        check_in,
                        check_out,
                      } = post; // Destructure the data
                      return (
                        <TableRow key={id}>
                          <TableCell>{id}</TableCell>
                          <TableCell>{role}</TableCell>
                          <TableCell>{country}</TableCell>
                          <TableCell>{state}</TableCell>
                          <TableCell>{latitude}</TableCell>
                          <TableCell>{longitude}</TableCell>
                          <TableCell>
                            {new Date(check_in).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {new Date(check_out).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Button
                  onClick={handlePreviousPage}
                  disabled={page === 0}
                  sx={{
                    backgroundColor: "#3498db",
                    mb: { xs: 1, md: 0 },
                    mr: { md: 1 },
                    "&:hover": { backgroundColor: "#2980b9" },
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextPage}
                  disabled={page >= Math.ceil(records.length / rowsPerPage) - 1}
                  sx={{
                    backgroundColor: "#3498db",
                    "&:hover": { backgroundColor: "#2980b9" },
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  Next
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "center",
                  alignItems: "center",

                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column", // Keeps content stacked in a column
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                    width: "100%", // Ensures the outer Box takes full width
                  }}
                ></Box>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
}