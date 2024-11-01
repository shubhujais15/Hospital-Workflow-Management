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
  CardOverflow,
} from "@mui/joy";
import Button from '@mui/joy/Button';

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

  const onSubmit = (data) => {
    console.log(data);
    setSubmitMessage("Form submitted successfully!");
    setOpenSnackbar(true);
    reset();
  };
  const dob = watch('dob');
  React.useEffect(() => {
    if (dob) {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setValue('age', age); 
    }
  }, [dob, setValue]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <Box sx={{ display: "flex", flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
        <FormControl error={!!errors.firstName} sx={{ width: { xs: '100%', sm: '30%' } }} margin="normal">
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
        
        <FormControl error={!!errors.MiddleName} sx={{ width: { xs: '100%', sm: '30%' } }} margin="normal">
          <FormLabel>Middle Name</FormLabel>
          <Input
            {...register("MiddleName")}
          />
          {errors.MiddleName && (
            <Typography variant="body2" color="danger">
              {errors.MiddleName.message}
            </Typography>
          )}
        </FormControl>
        
        <FormControl error={!!errors.lastName} sx={{ width: { xs: '100%', sm: '30%' } }} margin="normal">
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
      <FormControl fullWidth error={!!errors.age} margin="normal"sx={{flexBasis: '50%'}} >
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

      <FormControl fullWidth error={!!errors.mobile} margin="normal"sx={{mb:3}}>
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 ,mb:3}}>
        <Button type="submit" variant="soft">
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