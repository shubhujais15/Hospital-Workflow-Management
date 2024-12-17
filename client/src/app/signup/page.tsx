"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  Box,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Typography,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/joy";
import Button from '@mui/joy/Button';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Select, Option } from "@mui/joy";


const signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const [submitMessage, setSubmitMessage] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [avatarPreview, setAvatarPreview] = React.useState(null);

  const onSubmit = (data) => {
    console.log(data);
    setSubmitMessage("Form submitted successfully!");
    setOpenSnackbar(true);
    reset();
    setAvatarPreview(null);
  };

  const dob = watch("dob");
  const firstName = watch("firstName");

    React.useEffect(() => {
      if (dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        if (birthDate > today) {
          setValue("age", 0); // Set age to 0 for invalid future dates
          return;
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        setValue("age", age >= 0 ? age : 0); // Ensure age is not negative
      }
    }, [dob, setValue]);


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const buttonStyles = {
    mt: 2,
    backgroundColor: "rgb(17, 156, 177)",
    color: "#fff",
    "&:hover": { backgroundColor: "rgb(14, 125, 142)" },
  };
  

  return (
    <Box
    component="form"
    onSubmit={handleSubmit(onSubmit)}
    sx={{
      maxWidth: "650px",
      mx: "auto",
      my: 4,
      p: 3,
      borderRadius: "md",
      boxShadow: "lg",
      bgcolor: "background.body",
    }}
    noValidate
  >
    <Typography
      variant="h4"
      component="h2"
      sx={{ mb: 2, textAlign: "center" }}
    >
      Registration Form
    </Typography>

    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
      <Avatar
        src={avatarPreview}
        alt={firstName?.[0]?.toUpperCase() || "A"}
        sx={{ width: 80, height: 80, mb: 2 }}
      />
      <Button variant="outlined" component="label"
      sx={buttonStyles}
      >
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </Button>
    </Box>

    <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    gap: 2.5,
    mb: 2,
  }}
>
  {/* Title Dropdown */}
  <FormControl
    error={!!errors.title}
    sx={{ width: { xs: "100%", sm: "15%" } }}
    margin="normal"
  >
    <FormLabel>Title</FormLabel>
    <Select
      {...register("title", { required: "Title is required" })}
      placeholder="Select"
    >
      <Option value="Mr">Mr</Option>
      <Option value="Mrs">Mrs</Option>
      <Option value="Miss">Miss</Option>
      <Option value="Dr">Dr</Option>
      <Option value="Other">Other</Option>
    </Select>
    {errors.title && (
      <Typography variant="body2" color="danger">
        {errors.title.message}
      </Typography>
    )}
  </FormControl>

  {/* First Name */}
  <FormControl
    error={!!errors.firstName}
    sx={{ width: { xs: "100%", sm: "25%" } }}
    margin="normal"
  >
    <FormLabel>First Name</FormLabel>
    <Input
      {...register("firstName", { required: "First name is required" })}
    />
    {errors.firstName && (
      <Typography variant="body2" color="danger">
        {errors.firstName.message}
      </Typography>
    )}
  </FormControl>

  {/* Middle Name */}
  <FormControl
    sx={{ width: { xs: "100%", sm: "25%" } }}
    margin="normal"
  >
    <FormLabel>Middle Name</FormLabel>
    <Input {...register("MiddleName")} />
  </FormControl>

  {/* Last Name */}
  <FormControl
    error={!!errors.lastName}
    sx={{ width: { xs: "100%", sm: "25%" } }}
    margin="normal"
  >
    <FormLabel>Last Name</FormLabel>
    <Input
      {...register("lastName", { required: "Last name is required" })}
    />
    {errors.lastName && (
      <Typography variant="body2" color="danger">
        {errors.lastName.message}
      </Typography>
    )}
  </FormControl>
</Box>


    <Box sx={{ display: "flex",flexDirection: { xs: 'column', sm: 'row' } ,gap: 2 ,mb:2}}>
      <FormControl fullWidth error={!!errors.dob} margin="normal" sx={{flexBasis: '50%'}}>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type="date"
          {...register('dob', { required: "Date of birth is required" })}
        />
        {errors.dob && (
          <Typography variant="body2" color="danger">
            {errors.dob.message}
          </Typography>
        )}
      </FormControl> 
      <FormControl fullWidth error={!!errors.age} margin="normal" sx={{flexBasis: '50%'}} >
        <FormLabel>Age</FormLabel>
        <Input
        fullWidth 
          type="number"
          {...register("age", {
            required: "Age is required",
            min: { value: 1, message: "Age must be at least 1" },
          })}
        />
        {errors.age && (
          <Typography variant="body2" color="danger">
            {errors.age.message}
          </Typography>
        )}
      </FormControl>
    </Box>

    <FormControl fullWidth error={!!errors.email} margin="normal" sx={{mb:2}}>
      <FormLabel>Email</FormLabel>
      <Input
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            message: "Email is not valid",
          },
        })}
      />
      {errors.email && (
        <Typography variant="body2" color="danger">
          {errors.email.message}
        </Typography>
      )}
    </FormControl>

    <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 3 }}>
      <FormControl fullWidth error={!!errors.mobile} margin="normal" sx={{ flexBasis: '50%' }}>
        <FormLabel>Mobile No</FormLabel>
        <Input
          type="tel"
          {...register("mobile", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Mobile number must be 10 digits",
            },
          })}
        />
        {errors.mobile && (
          <Typography variant="body2" color="danger">
            {errors.mobile.message}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth error={!!errors.username} margin="normal" sx={{ flexBasis: '50%' }}>
        <FormLabel>Username</FormLabel>
        <Input
          {...register("username", {
            required: "Username is required",
            maxLength: { value: 20, message: "Username cannot exceed 20 characters" },
          })}
        />
        {errors.username && (
          <Typography variant="body2" color="danger">
            {errors.username.message}
          </Typography>
        )}
      </FormControl>
    </Box>

    <FormControl fullWidth error={!!errors.address} margin="normal" sx={{mb:3}}>
      <FormLabel>Address</FormLabel>
      <Textarea
        {...register("address", { required: "Address is required" })}
        minRows={3}
      />
      {errors.address && (
        <Typography variant="body2" color="danger">
          {errors.address.message}
        </Typography>
      )}
    </FormControl>

    <FormControl fullWidth error={!!errors.password} margin="normal">
      <FormLabel>Password</FormLabel>
      <Input
        type={showPassword ? "text" : "password"}
        {...register("password", { required: "Password is required" })}
        endDecorator={
          <Button
            variant="plain"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </Button>
        }
      />
      {errors.password && (
        <Typography variant="body2" color="danger">
          {errors.password.message}
        </Typography>
      )}
    </FormControl>

    <FormControl fullWidth error={!!errors.confirmPassword} margin="normal">
      <FormLabel>Confirm Password</FormLabel>
      <Input
        type={showPassword ? "text" : "password"}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === watch("password") || "Passwords do not match",
        })}
        endDecorator={
          <Button
            variant="plain"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </Button>
        }
      />
      {errors.confirmPassword && (
        <Typography variant="body2" color="danger">
          {errors.confirmPassword.message}
        </Typography>
      )}
    </FormControl>

    <Box sx={{ display: "flex", justifyContent: "center",gap: 3, mt: 2, mb: 3 }}>
    <Button
       variant="outlined" component="label"
       sx={{
        mt: 2,
        backgroundColor: "#FF0000", // Default red background
        color: "#fff", // White text color
        "&:hover": {
          backgroundColor: "#FF0020", // Dark red or burgundy color on hover
          // transform: "scale(1.05)",
        },
      }}
        onClick={() => {
          reset();
          setAvatarPreview(null);
        }}
      >
        Clear
      </Button>
    <Button variant="outlined"
      type="submit"
      sx={buttonStyles}>
      
        Submit
      </Button>
      
    </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {submitMessage}
          </Alert>
      </Snackbar>
    </Box>
  );
};

export default signup;