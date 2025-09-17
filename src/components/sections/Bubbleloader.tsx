// components/InfinityRibbonLoader.tsx
"use client";

import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function InfinityRibbonLoader({
  size = 12,
  color1 = "#6366f1",
  color2 = "#ec4899",
  gap = 10,
  count = 8,
}: {
  size?: number;
  color1?: string;
  color2?: string;
  gap?: number;
  count?: number;
}) {
  const bubbles = Array.from({ length: count });

  return (
    <Box
      sx={{
        position: "relative",
        width: 100,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {bubbles.map((_, i) => {
        const delay = (i / count) * 1.2; // stagger start times
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              background: `linear-gradient(45deg, ${color1}, ${color2})`,
              boxShadow: `0 0 10px ${color1}, 0 0 20px ${color2}`,
            }}
            animate={{
              x: [
                0,
                30 * Math.sin((i * Math.PI) / 4),
                60 * Math.sin((i * Math.PI) / 2),
                30 * Math.sin((i * Math.PI) / 4),
                0,
              ],
              y: [
                0,
                20 * Math.cos((i * Math.PI) / 4),
                0,
                -20 * Math.cos((i * Math.PI) / 4),
                0,
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 2.2,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </Box>
  );
}