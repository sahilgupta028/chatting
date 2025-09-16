// components/StatsSection.tsx
"use client";

import { Box, Grid, Typography, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MessageIcon from "@mui/icons-material/Message";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

const stats = [
  {
    id: 1,
    label: "Active Users",
    value: 10000,
    suffix: "+",
    icon: <PeopleIcon fontSize="large" color="primary" />,
  },
  {
    id: 2,
    label: "Uptime",
    value: 99.9,
    suffix: "%",
    icon: <AccessTimeIcon fontSize="large" color="success" />,
  },
  {
    id: 3,
    label: "Messages Sent",
    value: 5000000,
    suffix: "+",
    icon: <MessageIcon fontSize="large" color="secondary" />,
  },
  {
    id: 4,
    label: "Files Shared",
    value: 200000,
    suffix: "+",
    icon: <CloudDoneIcon fontSize="large" color="info" />,
  },
];

export default function StatsSection() {
  return (
    <Box
      sx={{
        py: 12,
        px: 4,
        bgcolor: "white",
      }}
    >
      <Stack spacing={2} alignItems="center" mb={8}>
        <Typography variant="h4" fontWeight="bold">
          Trusted by Thousands
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="sm"
          textAlign="center"
        >
          Our chat platform is built to scale and loved by users worldwide.
        </Typography>
      </Stack>

      <Grid container spacing={4} justifyContent="center">
        {stats.map((stat, index) => (
          <Box key={stat.id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  borderRadius: 4,
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="primary"
                  >
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      suffix={stat.suffix}
                    />
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Stack>
              </Paper>
            </motion.div>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
