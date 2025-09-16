// components/Loader.tsx
"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #eef2ff, #fdf6fb)",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              backgroundColor: "#6366f1",
            }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </Box>
  );
}