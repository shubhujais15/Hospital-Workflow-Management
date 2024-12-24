"use client";

import React, { useState, useEffect } from "react";
import SideNav from "../SideNav"
import LocationDisplay from "./LocationDisplay";
import {
  Button,Box,Typography,Switch,FormControl,FormLabel,Input,Card,Grid,Select,Avatar,// Option,// CardContent,// Skeleton,// IconButton,
} from "@mui/joy";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  AppBar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useGeolocated } from "react-geolocated";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { title } from "process";
import { Bold } from "lucide-react";
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
  const [showSideNav, setShowSideNav] = useState(false);
  const [role, setRole] = useState<string>("nurse");
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
  // const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [isNewSession, setIsNewSession] = useState<boolean>(false);
  const [records, setRecords] = useState<RecordEntry[]>([]);
  // const [locationInfo, setLocationInfo] = useState({ country: "", state: "" });
  // const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [sessionLocked, setSessionLocked] = useState<boolean>(false);
  // const [coordsState, setCoordsState] = useState({
  //   latitude: "",
  //   longitude: "",
  // });
  const [page, setPage] = useState(0);
  const rowsPerPage = 3;
   const [locationEnabled, setLocationEnabled] = useState(false);
    const [coords, setCoords] = useState(null);
    const [locationInfo, setLocationInfo] = useState({ country: "", state: "" });
    const [coordsState, setCoordsState] = useState({ latitude: "", longitude: "" });
    const [loadingLocation, setLoadingLocation] = useState(false);

  // const { coords } = useGeolocated({
  //   positionOptions: { enableHighAccuracy: true },
  //   userDecisionTimeout: 5000,
  // });
  // const [checkInDate, setCheckInDate] = useState<dayjs.Dayjs | null>(null);
  // const [records, setRecords] = useState<RecordEntry[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [remark, setRemark] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const handleSave = () => {
    const newRecord: RecordEntry = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      state: locationInfo.state,
      country: locationInfo.country,
      checkIn: checkInDate?.format("DD/MMM/YYYY hh:mm A") || "N/A",
      checkOut: null,
      remark: null,
    };
    setRecords([...records, newRecord]);
    setShowHistory(true);
  };

  const handleCheckout = (index: number) => {
    setCurrentIndex(index);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setRemark("");
    setCurrentIndex(null);
  };

  const handleRemarkSubmit = () => {
    if (currentIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[currentIndex].checkOut = dayjs().format("DD/MMM/YYYY hh:mm A");
      updatedRecords[currentIndex].remark = remark;
      setRecords(updatedRecords);
    }
    handleDialogClose();
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoords({ latitude, longitude });
            setLocationEnabled(true);
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLocationEnabled(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLocationEnabled(false);
      }
    };

    getUserLocation();
  }, []);

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

  // const handleSave = () => {
  //   if (checkInDate && coords) {
  //     const newRecord: RecordEntry = {
  //       role,
  //       country: locationInfo.country,
  //       state: locationInfo.state,
  //       latitude: coords.latitude.toString(),

  //       longitude: coords.longitude.toString(),
  //       checkIn: checkInDate.format("DD/MMM/YYYY hh:mm A"),
  //       // checkOut: checkOutDate.format("DD/MMM/YYYY hh:mm A"),
  //     };
  //     setRecords((prevRecords) => [...prevRecords, newRecord]);
  //     setIsNewSession(false);
  //     setSessionLocked(false);
  //     setCheckInDate(null);
  //     // setCheckOutDate(null);
  //   }
  // };

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

  const buttonStyles = {
    // mt: 4,
    height: 40,  // Height consistent with other inputs
    width: "80%",  // Ensure button takes up half the available space
    borderRadius: 6,
    backgroundColor: "rgb(17, 156, 177)",
    color: "#fff",
    boxShadow: "0px 4px 8px rgba(17, 156, 177, 0.2)",
    "&:hover": { backgroundColor: "rgb(14, 125, 142)" },
  };

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  
  <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <SideNav expanded={showSideNav} />

        {/* Main Content Area */}
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
    {/* Box container to hold the hamburger menu and role dropdown */}
    <Toolbar>
              {/* Employee image and name on the left */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1, // Space between image and name
                  marginRight: 2,
                }}
              >
                <Avatar
                  src="/path-to-employee-image.jpg" // Replace with the actual path or state variable for the image
                  alt="Employee Image"
                  sx={{ width: 40, height: 40 }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: "#ecf0f1", fontWeight: "bold" }}
                >
                  Employee Name
                </Typography>
              </Box>

              {/* Centered Main Title */}
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center", color: "#ecf0f1" }}
              >
                Attendence Entry
              </Typography>
            </Toolbar>
</AppBar>

{/* Conditional Rendering of SideNav */}
{/* {showSideNav && <SideNav expanded={showSideNav} />} */}



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
              mb: 2,
              borderColor: "#3498db",
              boxShadow: 3,
              backgroundColor: "#ffffff",
            }}
          >
    <Grid container spacing={0.1} mb={1} alignItems="center">
      {/* Location Field */}
      <Grid item xs={12} sm={6} md={3}>
        <FormControl fullWidth>
          <FormLabel sx={{ marginBottom: 0.5 }}>Location</FormLabel> {/* Reduced bottom margin */}
          <Input
            value={loadingLocation ? "Fetching..." : `${locationInfo.state}, ${locationInfo.country}`}
            readOnly
            placeholder="Location"
            sx={{ height: 50, width: 200, fontSize: "1rem" }}  // Adjust height
          />
        </FormControl>
      </Grid>

      {/* Latitude Field */}
      <Grid item xs={12} sm={6} md={3}>
        <FormControl>
          <FormLabel sx={{ marginBottom: 0.5 }}>Latitude</FormLabel> {/* Reduced bottom margin */}
          <Input
            value={coordsState.latitude || "Fetching..."}
            readOnly
            placeholder="Latitude"
            sx={{ height: 50, width: 200, fontSize: "1rem" }}  // Adjust height
          />
        </FormControl>
      </Grid>

      {/* Longitude Field */}
      <Grid item xs={12} sm={6} md={3}>
        <FormControl>
          <FormLabel sx={{ marginBottom: 0.5 }}>Longitude</FormLabel> {/* Reduced bottom margin */}
          <Input
            value={coordsState.longitude || "Fetching..."}
            readOnly
            placeholder="Longitude"
            sx={{ height: 50, width: 200, fontSize: "1rem" }}  // Adjust height
          />
        </FormControl>
      </Grid>

      {/* Check-In Field and Save Button */}
      <Grid item xs={12} sm={6} md={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,  // Added gap between the Check-In field and Save button
          }}
        >
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth>
              <FormLabel sx={{ marginBottom: 0.5 }}>Check-In</FormLabel> {/* Reduced bottom margin */}
              <DateTimePicker
                value={checkInDate}
                onChange={(newValue) => setCheckInDate(newValue)}
                sx={{
                  height: 50,           // Match height with other inputs
                  width: 180,           // Match width with other inputs
                  fontSize: "1rem",     // Same font size as inputs
                }}
              />
            </FormControl>
          </Box>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!checkInDate}
            sx={{
              mt: 4,
              height: 40,  // Height consistent with other inputs
              width: "100%",  // Ensure button takes up half the available space
              borderRadius: 4,
              backgroundColor: "rgb(17, 156, 177)",
              color: "#fff",
              boxShadow: "0px 4px 8px rgba(17, 156, 177, 0.2)",
              "&:hover": { backgroundColor: "rgb(14, 125, 142)" },
            }}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Card>
</Box>




{showHistory && (
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
                sx={{ color: "#2c3e50", fontWeight: "bold" }}
              >
                History
              </Typography>

              <Box sx={{ overflowX: "auto", width: "100%" }}>
                <Table sx={{ minWidth: 600 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: "#3498db", color: "#ffffff" }}>
                        Latitude
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#3498db", color: "#ffffff" }}>
                        Longitude
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#3498db", color: "#ffffff" }}>
                        State
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#3498db", color: "#ffffff" }}>
                        Country
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#3498db", color: "#ffffff" }}>
                        Check In
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#3498db", color: "#ffffff" }}>
                        Checkout
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.latitude}</TableCell>
                        <TableCell>{record.longitude}</TableCell>
                        <TableCell>{record.state}</TableCell>
                        <TableCell>{record.country}</TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>
                          {record.checkOut ? (
                            <>
                              <Typography>{record.checkOut}</Typography>
                              <Typography variant="caption">{record.remark}</Typography>
                            </>
                          ) : (
                            <Button
                            sx={
                              buttonStyles
                            }
                              variant="contained"
                              onClick={() => handleCheckout(index)}
                            >
                              Checkout
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Card>
          )}
        </Box>
      </Box>

      {/* Dialog for Remark */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Enter Remark</DialogTitle>
        <DialogContent>
          <TextField
            label="Remark"
            fullWidth
            multiline
            rows={3}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}
          sx={{backgroundColor: "red" }}>Cancel</Button>
          <Button onClick={handleRemarkSubmit} disabled={!remark.trim()}
          sx={{backgroundColor: "rgb(17, 156, 177)",
            color: "#fff",
              boxShadow: "0px 4px 8px rgba(17, 156, 177, 0.2)",
              "&:hover": { backgroundColor: "rgb(14, 125, 142)" },
          }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
        {/* </Box> */}
        {/* // </Box>   */}
      {/* </Box> */}
      {/* </Box> */}
    </LocalizationProvider>
  );
}
