"use client";

import {
  Stack,
  Paper,
  Avatar,
  Box,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function ChatSection() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to ChatX 🎉", sender: "bot" },
    { id: 2, text: "Start chatting with your friends.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Got it ✅", sender: "bot" },
      ]);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Stack flex={1} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 0,
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexShrink: 0,
          bgcolor: "white",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>A</Avatar>
        <Typography variant="h6">Alice</Typography>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
          display: "flex",
          flexDirection: "column",
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#bbb", borderRadius: 3 },
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            component={motion.div}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            sx={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              bgcolor: msg.sender === "user" ? "primary.main" : "grey.200",
              color: msg.sender === "user" ? "white" : "black",
              px: 2,
              py: 1,
              borderRadius: msg.sender === "user" ? "16px 16px 0 16px" : "16px 16px 16px 0",
              maxWidth: "70%",
              boxShadow: 2,
              mb: 1.5,
              fontSize: "0.95rem",
            }}
          >
            {msg.text}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box
        sx={{
          p: 2,
          bgcolor: "white",
          borderTop: "1px solid #eee",
          flexShrink: 0,
          position: "sticky",
          bottom: 0,
        }}
      >
        <Paper
          sx={{
            p: 1,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 1,
            boxShadow: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 8 } }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" }, p: 1.5 }}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </Box>
    </Stack>
  );
}