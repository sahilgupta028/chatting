// components/FeaturesSection.tsx
"use client";

import { Box, Typography, Grid, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";
import ChatIcon from "@mui/icons-material/Chat";
import SecurityIcon from "@mui/icons-material/Security";
import GroupsIcon from "@mui/icons-material/Groups";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const features = [
  {
    id: 1,
    title: "Real-time Messaging",
    description: "Instantly send and receive messages with blazing-fast speed.",
    icon: <ChatIcon fontSize="large" color="primary" />,
  },
  {
    id: 2,
    title: "Secure & Encrypted",
    description: "Your conversations stay private with end-to-end encryption.",
    icon: <SecurityIcon fontSize="large" color="primary" />,
  },
  {
    id: 3,
    title: "Group Chats",
    description: "Create groups and collaborate seamlessly with your team.",
    icon: <GroupsIcon fontSize="large" color="primary" />,
  },
  {
    id: 4,
    title: "File Sharing",
    description: "Easily share media, docs, and files with cloud support.",
    icon: <CloudUploadIcon fontSize="large" color="primary" />,
  },
];

export default function FeaturesSection() {
  return (
    <Box
      sx={{
        py: 12,
        px: 4,
        bgcolor: "grey.50",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section Heading */}
      <Stack spacing={2} alignItems="center" mb={8}>
        <Typography variant="h4" fontWeight="bold">
          Powerful Features for Modern Chat
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="sm"
          textAlign="center"
        >
          Everything you need for seamless communication, whether it’s for your
          friends, family, or team.
        </Typography>
      </Stack>

      {/* Feature Cards */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={feature.id}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.7, type: "spring" }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={3}
                component={motion.div}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -1, 1, 0], // subtle tilt
                }}
                transition={{ duration: 0.4 }}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  textAlign: "center",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,247,255,0.9))",
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.05), 0 0 20px rgba(99,102,241,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow:
                      "0 6px 25px rgba(0,0,0,0.08), 0 0 30px rgba(99,102,241,0.2)",
                  },
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}