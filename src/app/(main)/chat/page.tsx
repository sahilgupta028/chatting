"use client";

import ChatSection from "@/components/chat-section/ChatSection";
import ChatSidebar from "@/components/chat-section/ChatSidebar";
import { Stack } from "@mui/material";

export default function ChatPage() {
  return (
    <Stack direction="row" sx={{ height: "100vh", bgcolor: "#f5f7fb" }}>
      <ChatSidebar />
      <ChatSection />
    </Stack>
  );
}