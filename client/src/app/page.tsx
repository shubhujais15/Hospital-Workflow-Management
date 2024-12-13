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
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import IconButton from "@mui/joy/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("username");
  const [inputValue, setInputValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);

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

  const handleForgetPassword = () => {
    setIsModalOpen(true);
  };

  const handleSendOtp = () => {
    if (inputValue) {
      setOtpSent(true);
    }
  };

  const handleChangePassword = () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      console.log("Password changed successfully");
      setIsModalOpen(false);
      setSuccessModalOpen(true);
    }
  };

  const resetForgetPasswordState = () => {
    setOtpSent(false);
    setInputValue("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const buttonStyles = {
    mt: 2,
    backgroundColor: "rgb(17, 156, 177)",
    color: "#fff",
    "&:hover": { backgroundColor: "rgb(14, 125, 142)" },
  };
  

  return (
    <CssVarsProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "linear-gradient(to bottom right, #e0f7fa, #e1bee7)",
          p: 2,
        }}
      >
        <Sheet
          sx={{
            width: { xs: 350, sm: 400 },
            p: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
            bgcolor: "#fff",
            textAlign: "center",
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>

          <Typography level="h4" component="h1" sx={{ mb: 3, fontWeight: 700, color: "#333" }}>
            Welcome Back
          </Typography>
          <Typography sx={{ mb: 3, color: "#666" }}>Please login to continue</Typography>

          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 2 }}>
              <Input
                type="text"
                name="emailOrphoneNumber"
                placeholder="Email or Phone Number"
                value={formData.emailOrphoneNumber}
                onChange={handleChange}
                sx={{
                  borderRadius: 2,
                  boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e0e0e0",
                }}
                required
              />
              {errors.emailOrphoneNumber && (
                <Alert color="danger" size="sm" sx={{ mt: 1 }}>
                  {errors.emailOrphoneNumber}
                </Alert>
              )}
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                sx={{
                  borderRadius: 2,
                  boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e0e0e0",
                }}
                endDecorator={
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    size="sm"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                required
              />
              {errors.password && (
                <Alert color="danger" size="sm" sx={{ mt: 1 }}>
                  {errors.password}
                </Alert>
              )}
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
                type="submit"
                sx={{
                  width: "48%",
                  borderRadius: 2,
                  backgroundColor: "rgb(17, 156, 177)",
                  color: "#fff",
                  boxShadow: "0px 4px 8px rgba(17, 156, 177, 0.2)",
                  "&:hover": { backgroundColor: "rgb(14, 125, 142)" },
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{
                  width: "48%",
                  borderRadius: 2,
                  borderColor: "rgb(17, 156, 177)",
                  color: "rgb(17, 156, 177)",
                  boxShadow: "0px 4px 8px rgba(17, 156, 177, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(17, 156, 177, 0.1)",
                    borderColor: "rgb(14, 125, 142)",
                    color: "rgb(14, 125, 142)",
                  },
                }}
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Box>

            <Button
              onClick={handleForgetPassword}
              sx={{
                mt: 2,
                width: "48%",
                // borderRadius: 5,
                backgroundColor: "rgb(17, 156, 177)",
                color: "#fff",
                boxShadow: "0px 4px 8px rgba(17, 156, 177, 0.2)",
                "&:hover": { backgroundColor: "rgb(14, 125, 142)" },
              }}
            >
              Forgot Password?
            </Button>
          </form>
        </Sheet>

        {/* Forget Password Modal */}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalDialog
            sx={{ maxWidth: 400, borderRadius: 2, p: 3 }}
          >
            <Typography level="h5" sx={{ mb: 2 }}>
              Reset Password
            </Typography>

            {!otpSent ? (
              <>
                <RadioGroup
                  name="resetOption"
                  defaultValue={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  <Radio value="username" label="Username" />
                  <Radio value="email" label="Email" />
                </RadioGroup>

                <FormControl sx={{ mb: 2 }}>
                  <Input
                    type="text"
                    placeholder={selectedOption === "username" ? "Enter Username" : "Enter Email"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                  />
                </FormControl>

                <Button
                  onClick={handleSendOtp}
                  sx={buttonStyles}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <FormControl sx={{ mb: 2 }}>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </FormControl>

                <FormControl sx={{ mb: 2 }}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    endDecorator={
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="sm"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                    required
                  />
                </FormControl>

                <FormControl sx={{ mb: 2 }}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    endDecorator={
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        size="sm"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                    required
                  />
                </FormControl>

                <Button
                  onClick={handleChangePassword}
                  sx={buttonStyles}
                >
                  Change Password
                </Button>
              </>
            )}
          </ModalDialog>
        </Modal>

        {/* Success Modal */}
        <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
          <ModalDialog
            sx={{ maxWidth: 400, borderRadius: 2, p: 3 }}
          >
            <Typography level="h5" sx={{ mb: 2, textAlign: "center" }}>
              Password Changed Successfully
            </Typography>
            <Button
              onClick={() => setSuccessModalOpen(false)}
              sx={buttonStyles}
            >
              Close
            </Button>
          </ModalDialog>
        </Modal>
        <Modal open={successModalOpen} onClose={() => {
        setSuccessModalOpen(false);
        resetForgetPasswordState();
      }}>
        <ModalDialog
          sx={{ maxWidth: 400, borderRadius: 2, p: 3 }}
        >
          <Typography level="h5" sx={{ mb: 2, textAlign: "center" }}>
            Password Changed Successfully
          </Typography>
          <Button
            onClick={() => {
              setSuccessModalOpen(false);
              resetForgetPasswordState();
            }}
            sx={buttonStyles} 
          >
            Close
          </Button>
        </ModalDialog>
      </Modal>

      </Box>
    </CssVarsProvider>
  );
}
