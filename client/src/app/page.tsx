"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Alert from "@mui/joy/Alert";
import Image from "next/image";

interface FormData {
  emailOrphoneNumber: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    emailOrphoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.emailOrphoneNumber) {
      newErrors.emailOrphoneNumber = "Email or phone number is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      router.push("/dashboard");
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <CssVarsProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "linear-gradient(to bottom right, #e0f7fa, #e1bee7)", // Light gradient background color
          p: 2,
        }}
      >
        <Sheet
          sx={{
            width: { xs: 350, sm: 400 }, // Responsive card width
            p: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)", // Soft shadow effect
            bgcolor: "#fff",
            textAlign: "center",
          }}
        >
          {/* Logo Section */}
          <Box sx={{ mb: 3 }}>
            <Image
              src="/logo.png" // Replace with your logo path
              alt="Logo"
              width={100}
              height={100}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Box>

          {/* Heading */}
          <Typography
            level="h4"
            component="h1"
            sx={{ mb: 3, fontWeight: 700, color: "#333" }}
          >
            Welcome Back
          </Typography>
          <Typography  sx={{ mb: 3, color: "#666" }}>
            Please login to continue
          </Typography>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email or Username Input */}
            <FormControl sx={{ mb: 2 }}>
              <Input
                type="text"
                name="emailOrphoneNumber"
                placeholder="Email or Phone Number"
                value={formData.emailOrphoneNumber}
                onChange={handleChange}
                sx={{
                  borderRadius: 2,
                  boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)", // Inset shadow for depth
                  border: "1px solid #e0e0e0", // Light border color
                }}
                required
              />
              {errors.emailOrphoneNumber && (
                <Alert color="danger" size="sm" sx={{ mt: 1 }}>
                  {errors.emailOrphoneNumber}
                </Alert>
              )}
            </FormControl>

            {/* Password Input */}
            <FormControl sx={{ mb: 2 }}>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                sx={{
                  borderRadius: 2,
                  boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)", // Inset shadow for depth
                  border: "1px solid #e0e0e0", // Light border color
                }}
                required
              />
              {errors.password && (
                <Alert color="danger" size="sm" sx={{ mt: 1 }}>
                  {errors.password}
                </Alert>
              )}
            </FormControl>

            {/* Buttons: Login and Sign Up */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                type="submit"
                sx={{
                  width: "48%",
                  borderRadius: 2,
                  backgroundColor: "#007bff",
                  color: "#fff",
                  boxShadow: "0px 4px 8px rgba(0, 123, 255, 0.2)", // Light button shadow
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: "48%",
                  borderRadius: 2,
                  borderColor: "#007bff",
                  color: "#007bff",
                  boxShadow: "0px 4px 8px rgba(0, 123, 255, 0.1)", // Light button shadow
                  "&:hover": {
                    backgroundColor: "#f0f4f8",
                    borderColor: "#0056b3",
                    color: "#0056b3",
                  },
                }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Box>
          </form>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}
