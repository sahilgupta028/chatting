// components/LiveDemoSection.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Stack, Paper, Avatar } from "@mui/material";
import { motion } from "framer-motion";

type Sender = "left" | "right";
type DemoMessage = { id: number; text: string; sender: Sender };

const demoMessages: DemoMessage[] = [
  { id: 1, text: "Hey! 👋", sender: "left" },
  { id: 2, text: "Hi there! How’s it going?", sender: "right" },
  { id: 3, text: "Pretty good — testing the new chat app 😎", sender: "left" },
  { id: 4, text: "Looks awesome! 🚀", sender: "right" },
];

export default function LiveDemoSection() {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  // Looping conversation
  useEffect(() => {
    let cancelled = false;

    const runDemo = async () => {
      while (!cancelled) {
        setMessages([]);
        setTypedText("");
        for (let i = 0; i < demoMessages.length; i++) {
          if (cancelled) return;
          setShowTyping(true);
          await new Promise((r) => setTimeout(r, 900));
          if (cancelled) return;
          setMessages((prev) => [...prev, demoMessages[i]]);
          setShowTyping(false);
          await new Promise((r) => setTimeout(r, 800));
        }

        // Typing into fake input
        const text = "Try it out — type a message...";
        for (let j = 0; j < text.length; j++) {
          if (cancelled) return;
          await new Promise((r) => setTimeout(r, 50));
          setTypedText((prev) => prev + text[j]);
        }

        // Pause before restarting loop
        await new Promise((r) => setTimeout(r, 1500));
      }
    };

    runDemo();

    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll to bottom when messages or typing update
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, showTyping]);

  // Floating particles
  const particles = Array.from({ length: 8 });

  return (
    <Box
      component="section"
      sx={{
        py: 16,
        px: 2,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg,#eef2ff,#fdf6fb)",
      }}
    >
      {/* Animated background particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 30 + Math.random() * 40,
            height: 30 + Math.random() * 40,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.1)",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            x: [0, 50 - Math.random() * 100, 0],
            y: [0, 50 - Math.random() * 100, 0],
          }}
          transition={{ repeat: Infinity, duration: 20 + Math.random() * 10, ease: "easeInOut" }}
        />
      ))}

      {/* Heading */}
      <Stack spacing={2} alignItems="center" mb={8}>
        <Typography variant="h3" fontWeight="bold" textAlign="center">
          Live Demo
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth="md">
          Watch messages animate in real-time, with typing indicators and a lively background.
        </Typography>
      </Stack>

      {/* Chat Window */}
      <Box sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
        <Paper
          elevation={12}
          sx={{
            width: "min(960px,95%)",
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            minHeight: 550,
            boxShadow: "0 15px 50px rgba(0,0,0,0.1)",
            position: "relative",
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              px: 3,
              py: 2,
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Chat Preview
            </Typography>
          </Box>

          {/* Messages */}
          <Box ref={chatRef} sx={{ px: 3, py: 4, flex: 1, overflowY: "auto", bgcolor: "background.paper" }}>
            <Stack spacing={2}>
              {messages.map((msg) => {
                const align = msg.sender === "right" ? "flex-end" : "flex-start";
                const bg = msg.sender === "right" ? "primary.main" : "grey.200";
                const color = msg.sender === "right" ? "white" : "text.primary";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.sender === "right" ? 60 : -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    <Box sx={{ display: "flex", justifyContent: align, alignItems: "flex-end", gap: 1 }}>
                      {msg.sender === "left" && <Avatar sx={{ bgcolor: "primary.main", width: 28, height: 28 }}>A</Avatar>}
                      <Paper sx={{ px: 2.5, py: 1.2, maxWidth: "70%", bgcolor: bg, color, borderRadius: 3 }}>
                        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                          {msg.text}
                        </Typography>
                      </Paper>
                      {msg.sender === "right" && <Avatar sx={{ bgcolor: "secondary.main", width: 28, height: 28 }}>B</Avatar>}
                    </Box>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {showTyping && (() => {
                const nextIndex = messages.length;
                const next = demoMessages[nextIndex] || { sender: "left" as Sender };
                const align = next.sender === "right" ? "flex-end" : "flex-start";
                return (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <Box sx={{ display: "flex", justifyContent: align }}>
                      <Paper sx={{ px: 2, py: 0.75, maxWidth: "40%", bgcolor: "grey.200", borderRadius: 3 }}>
                        <Box sx={{ display: "flex", gap: 0.5, alignItems: "flex-end" }}>
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              style={{ width: 8, height: 8, borderRadius: "50%", background: "#8b8b8b", display: "inline-block" }}
                              animate={{ y: [0, -6, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.18 }}
                            />
                          ))}
                        </Box>
                      </Paper>
                    </Box>
                  </motion.div>
                );
              })()}
            </Stack>
          </Box>

          {/* Fake input */}
          <Box sx={{ px: 3, py: 2, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <Paper sx={{ px: 2, py: 1.2, borderRadius: 3, display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  color: typedText ? "text.primary" : "text.disabled",
                  fontFamily: "monospace",
                  flexGrow: 1,
                }}
              >
                {typedText || "Type a message..."}
              </Typography>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{ marginLeft: 6 }}
              >
                |
              </motion.span>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}