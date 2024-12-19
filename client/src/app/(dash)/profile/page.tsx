"use client"
import React, { useState } from 'react';
import {
  Box,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Typography,
  Avatar,
  Button,
  IconButton,
} from '@mui/joy';
import { Edit, Check } from '@mui/icons-material';
import SideNav from "../SideNav";
import {
  AppBar,
  Toolbar,
} from "@mui/material";

export default function Profile() {
  const [showSideNav, setShowSideNav] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    age: 33,
    email: '',
    mobile: '',
    username: '',
    address: '',
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handlePasswordEditToggle = () => {
    setIsPasswordEditing(!isPasswordEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Updated Profile Data:', formData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsPasswordEditing(false);
    console.log('Password Change Data:', passwordData);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SideNav expanded={showSideNav} />

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
              Profile Manager
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Profile Form */}
        <Box
          component="form"
          onSubmit={handleFormSubmit}
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
          {/* Header with Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2">
              Edit Profile
            </Typography>
            <Box>
              <IconButton onClick={handleEditToggle}>
                {isEditing ? <Check /> : <Edit />}
              </IconButton>
              
            </Box>
          </Box>

          {/* Avatar Section */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar
              src={formData.avatar}
              alt={formData.firstName?.[0]?.toUpperCase() || "A"}
              sx={{ width: 80, height: 80, mb: 2 }}
            />
            {isEditing && (
              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </Button>
            )}
          </Box>

          {/* Profile Fields */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Middle Name</FormLabel>
              <Input
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mobile</FormLabel>
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormControl>
          </Box>

          {/* Submit Button */}
          {isEditing && (
            <Button type="submit" sx={{ mt: 3 }}>
              Save Changes
            </Button>
          )}
        </Box>

        {/* Password Change Section */}
        <Box
          component="form"
          onSubmit={handlePasswordSubmit}
          sx={{
            maxWidth: "650px",
            mx: "auto",
            my: 4,
            p: 3,
            borderRadius: "md",
            boxShadow: "lg",
            bgcolor: "background.body",
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h2">
              Change Password
            </Typography>
            <Box>
              <IconButton onClick={handlePasswordEditToggle}>
                {isPasswordEditing ? <Check /> : <Edit />}
              </IconButton>
            </Box>
          </Box>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>Old Password</FormLabel>
            <Input
              name="oldPassword"
              type="password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              disabled={!isPasswordEditing}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <FormLabel>New Password</FormLabel>
            <Input
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              disabled={!isPasswordEditing}
            />
          </FormControl>
          <FormControl sx={{ mb: 3 }}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              disabled={!isPasswordEditing}
            />
          </FormControl>
          {isPasswordEditing && (
            <Button type="submit">Change Password</Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
