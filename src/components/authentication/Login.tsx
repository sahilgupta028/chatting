"use client";

import React, { useState, useEffect } from "react";
import { Box, Paper, TextField, Button, Stack, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import BubbleLoader from "../sections/Bubbleloader";

type FormData = {
  phone: string;
  password: string;
};

type Step = {
  key: keyof FormData; // 👈 restrict to valid keys
  type?: string;
  label: string;
};

export default function ChatLogin() {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [botTyping, setBotTyping] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ phone: "", password: "" });

  const steps = [
    { key: "phone", label: "Enter your phone number" },
    { key: "password", label: "Enter your password", type: "password" },
  ];

  useEffect(() => {
    setBotTyping(true);
    const timeout = setTimeout(() => setBotTyping(false), 800);
    return () => clearTimeout(timeout);
  }, [step]);

  const loginUser = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        phone: formData.phone,
        password: formData.password,
      });

      if (result?.error) {
        toast.error(result.error);
        return false;
      }

      toast.success("Logged in successfully!");
      return true;
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error");
      return false;
    }
  };

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      const success = await loginUser();
      setLoading(false);
      if (success) setCompleted(true);
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
              position: "relative",
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
                <BubbleLoader />
              </Box>
            )}

            <Stack spacing={3}>
              <Typography variant="h5" fontWeight="bold" textAlign="center">
                Login
              </Typography>

              <Box sx={{ minHeight: 300, display: "flex", flexDirection: "column", gap: 2 }}>
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
                          bgcolor: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                          borderRadius: 4,
                          textAlign: "center",
                          boxShadow: 6,
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          ✅ Logged in successfully!
                        </Typography>
                        <Typography variant="body2" mt={1}>
                          Welcome back to the app.
                        </Typography>
                      </Paper>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Bot bubble */}
                      <Paper
                        sx={{
                          p: 2.5,
                          maxWidth: "85%",
                          bgcolor: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: "16px 16px 16px 0px",
                          boxShadow: 4,
                          mb: 1,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Typography variant="body1">{steps[step].label}</Typography>
                      </Paper>

                      {/* Input */}
                      {!botTyping && (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          type={steps[step].type || "text"}
                          value={formData[steps[step].key as keyof FormData]}
                          onChange={(e) =>
                            setFormData({ ...formData, [steps[step].key]: e.target.value })
                          }
                          disabled={loading}
                          onKeyDown={(e) => e.key === "Enter" && handleNext()}
                        />
                      )}

                      {/* Next button */}
                      {!botTyping && (
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ mt: 2 }}
                          onClick={handleNext}
                          disabled={loading || !steps[step].key.trim()}
                        >
                          Next
                        </Button>
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