"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";

interface Chat {
  name: string;
  lastMessage: string;
  unread: number;
}

interface AllChatsProps {
  open: boolean;
  onClose: () => void;
  chats?: Chat[];
}

export default function AllChats({
  open,
  onClose,
  chats = [
    { name: "General Chat", lastMessage: "Hey team, are we meeting today?", unread: 3 },
    { name: "Project Alpha", lastMessage: "The build is complete!", unread: 0 },
    { name: "Random", lastMessage: "Check out this meme 😂", unread: 1 },
    { name: "Team Updates", lastMessage: "Don't forget the deadline tomorrow", unread: 0 },
  ],
}: AllChatsProps) {
  const [chatList, setChatList] = useState(chats);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          All Chats
        </Typography>
      </DialogTitle>
      <DialogContent>
        {chatList.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={2}>
            No chats available
          </Typography>
        ) : (
          <List>
            {chatList.map((chat, i) => (
              <ListItem key={i} sx={{ mb: 1, p: 0 }}>
                <Paper
                  component={motion.div}
                  whileHover={{ scale: 1.02 }}
                  elevation={2}
                  sx={{
                    p: 1.5,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {chat.name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <Stack spacing={0.3}>
                      <Typography fontWeight="bold">{chat.name}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap maxWidth={180}>
                        {chat.lastMessage}
                      </Typography>
                    </Stack>
                  </Stack>

                  {chat.unread > 0 && (
                    <Badge
                      badgeContent={chat.unread}
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Paper>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}