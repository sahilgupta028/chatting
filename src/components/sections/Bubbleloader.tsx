// components/BubbleLoader.tsx
"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function BubbleLoader({ size = 16, color = "#6366f1", gap = 8 }: { size?: number; color?: string; gap?: number }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: gap,
        height: 50,
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: color,
          }}
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </Box>
  );
}
