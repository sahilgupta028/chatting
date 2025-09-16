"use client";

import React, { useState, useEffect } from "react";
import { Box, Paper, TextField, Button, Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../common/Loader";

export default function ChatSignup() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [botTyping, setBotTyping] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const steps = [
    { key: "fullName", label: "What's your full name?" },
    { key: "email", label: "Enter your email address" },
    { key: "phone", label: "Enter your phone number" },
    { key: "password", label: "Create a password", type: "password" },
    { key: "confirmPassword", label: "Confirm your password", type: "password" },
  ];

  useEffect(() => {
    setBotTyping(true);
    const timeout = setTimeout(() => setBotTyping(false), 800);
    return () => clearTimeout(timeout);
  }, [step]);

  const registerStudent = async () => {
  try {
    const response = await fetch("/api/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Registration failed:", data.message);
      alert(data.message);
    } else {
      console.log("Registered:", data);
      alert(`Welcome, ${formData.fullName}! Your username is ${data.username}`);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Server error");
  }
};

  const handleNext = async () => {
  if (step < steps.length - 1) {
    setStep(step + 1);
  } else {
    setLoading(true);
    await registerStudent();
    setLoading(false);
    setCompleted(true);
  }
};

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        zIndex: 9999,
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            sx={{
              p: 4,
              borderRadius: 5,
              maxWidth: 400,
              width: "100%",
              boxShadow: 12,
              bgcolor: "#f5f5f5",
            }}
          >
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Sign Up
              </Typography>

              <Box sx={{ minHeight: 400, display: "flex", flexDirection: "column", gap: 2 }}>
                <AnimatePresence initial={false}>
                  {completed ? (
                    <motion.div
                      key="completed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <Paper
                        sx={{
                          p: 3,
                          bgcolor: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                        //   color: "white",
                          borderRadius: 4,
                          textAlign: "center",
                          boxShadow: 6,
                        }}
                      >
                        {loading && (
                        <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          bgcolor: "rgba(0,0,0,0.4)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 5,
                          zIndex: 10,
                        }}
                        >
                     <Loader /> {/* Your loader component */}
                     </Box>
                    )}
                        <Typography variant="h6" fontWeight="bold">
                          🎉 Welcome, {formData.fullName}!
                        </Typography>
                        <Typography variant="body2" mt={1}>
                          Your account has been successfully created.
                        </Typography>
                      </Paper>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 3,
                          py: 1.5,
                          borderRadius: 3,
                          fontWeight: "bold",
                          background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                          color: "#fff",
                          "&:hover": {
                            background: "linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)",
                            boxShadow: "0 0 15px rgba(56,249,215,0.5)",
                          },
                        }}
                        onClick={() => {
                          setStep(0);
                          setFormData({
                            fullName: "",
                            email: "",
                            phone: "",
                            password: "",
                            confirmPassword: "",
                          });
                          setCompleted(false);
                        }}
                      >
                        Reset
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Bot Bubble */}
                      <Paper
                        sx={{
                          p: 2.5,
                          maxWidth: "85%",
                          bgcolor: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                        //   color: "white",
                          borderRadius: "16px 16px 16px 0px",
                          boxShadow: 4,
                          mb: 1,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Typography variant="body1">{steps[step].label}</Typography>
                      </Paper>

                      {/* Typing indicator */}
                      {botTyping && (
                        <Box sx={{ display: "flex", alignItems: "center', mb: 1, ml: 2" }}>
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
                              style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: "white",
                                marginRight: 5,
                              }}
                            />
                          ))}
                        </Box>
                      )}

                      {/* User Input */}
                      {!botTyping && (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          type={steps[step].type || "text"}
                          value={formData[steps[step].key]}
                          onChange={(e) =>
                            setFormData({ ...formData, [steps[step].key]: e.target.value })
                          }
                          sx={{
                            mt: 1,
                            borderRadius: 3,
                            "& .MuiOutlinedInput-root": { borderRadius: 3 },
                          }}
                          onKeyDown={(e) => e.key === "Enter" && handleNext()}
                        />
                      )}

                      {/* Next Button */}
                      {!botTyping && (
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            mt: 2,
                            py: 1.5,
                            borderRadius: 3,
                            fontWeight: "bold",
                            background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                            color: "#fff",
                            "&:hover": {
                              background: "linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)",
                              boxShadow: "0 0 15px rgba(56,249,215,0.5)",
                            },
                          }}
                          onClick={handleNext}
                          disabled={
                            !formData[steps[step].key].trim() ||
                            (steps[step].key === "confirmPassword" &&
                              formData.confirmPassword !== formData.password)
                          }
                        >
                          Next
                        </Button>
                      )}

                      {/* Password mismatch */}
                      {steps[step].key === "confirmPassword" &&
                        formData.confirmPassword &&
                        formData.confirmPassword !== formData.password && (
                          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                            Passwords do not match
                          </Typography>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Stack>
          </Paper>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}