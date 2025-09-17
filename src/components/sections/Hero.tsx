// components/HeroSection.tsx
"use client";

import { Box, Typography, Button, Stack, Paper, Dialog } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SignupModal from "../authentication/Signup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const messages = [
  { id: 1, text: "Hey 👋, welcome to ChatPro!" },
  { id: 2, text: "Connect instantly with friends & teams." },
  { id: 3, text: "Fast. Secure. Scalable. 🚀" },
];

export default function HeroSection() {
  const [openSignup, setOpenSignup] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  // ✅ If session exists, redirect to /chat
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.push("/chat");
    }
  }, [status, session, router]);

  return (
    <Box
      sx={{
        bgcolor: "white",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        py: 8,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        alignItems="center"
        maxWidth="lg"
      >
        {/* Left Content */}
        <Stack spacing={3} flex={1}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ lineHeight: 1.2 }}
          >
            Chat Smarter.  
            <Typography component="span" color="primary">
              {" "}Connect Faster.
            </Typography>
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Experience seamless real-time messaging with secure, scalable, and
            modern chat features built for you.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large" onClick={() => setOpenSignup(true)}>
              Get Started
            </Button>
            <Button variant="outlined" size="large">
              Try Demo
            </Button>
          </Stack>
        </Stack>

        {/* Right Chat Animation */}
        <Stack
          flex={1}
          spacing={2}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {messages.map((msg, index) => (
            <Paper
              key={msg.id}
              component={motion.div}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.6 }}
              sx={{
                p: 2,
                maxWidth: "80%",
                alignSelf: index % 2 === 0 ? "flex-start" : "flex-end",
                borderRadius: 4,
                boxShadow: 3,
              }}
            >
              <Typography>{msg.text}</Typography>
            </Paper>
          ))}

          {/* Typing Dots */}
          <Paper
            sx={{
              p: 1.5,
              maxWidth: "40%",
              alignSelf: "flex-start",
              borderRadius: 4,
              bgcolor: "grey.100",
            }}
          >
            <Stack direction="row" spacing={0.5}>
              {[0.3, 0.6, 0.9].map((delay, i) => (
                <motion.span
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#888",
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay,
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Stack>

      <Dialog open={openSignup} onClose={() => setOpenSignup(false)} maxWidth="xs" fullWidth>
      <SignupModal />
     </Dialog>
    </Box>
  );
}