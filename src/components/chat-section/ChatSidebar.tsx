"use client";

import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { signOut } from "next-auth/react";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import AllChats from "./AllChats";
import FriendRequests from "./FriendRequest";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const friends = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace"];

export default function ChatSidebar() {
  const [anchorOptions, setAnchorOptions] = useState<null | HTMLElement>(null);
  const [openFriend, setOpenFriend] = useState(false);
  const [openChats, setOpenChats] = useState(false);

  return (
    <Box
      sx={{
        width: 300,
        bgcolor: "white",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">ChatX</Typography>

          {/* Options Dropdown */}
          <IconButton
            size="small"
            sx={{ color: "white"}}
            onClick={(e) => setAnchorOptions(e.currentTarget)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorOptions}
            open={Boolean(anchorOptions)}
            onClose={() => setAnchorOptions(null)}
          >
            <MenuItem
              onClick={() => {
                setOpenFriend(true);
                setAnchorOptions(null);
              }}
            >
              <ListItemIcon>
                <PeopleIcon fontSize="small" />
              </ListItemIcon>
              Friend Requests
            </MenuItem>

            <MenuItem
              onClick={() => {
                setOpenChats(true);
                setAnchorOptions(null);
              }}
            >
              <ListItemIcon>
                <ChatIcon fontSize="small" />
              </ListItemIcon>
              All Chats
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setAnchorOptions(null);
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Sign Out
            </MenuItem>
          </Menu>
        </Stack>
      </Box>

      {/* Chat List */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          "&::-webkit-scrollbar": { width: 6 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#bbb", borderRadius: 3 },
        }}
      >
        {friends.map((name, i) => (
          <Paper
            key={i}
            sx={{
              p: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 1.5,
              cursor: "pointer",
              borderRadius: 3,
              transition: "0.2s",
              "&:hover": { bgcolor: "primary.light", color: "white" },
            }}
            component={motion.div}
            whileHover={{ scale: 1.02 }}
          >
            <Avatar sx={{ bgcolor: "primary.main" }}>{name[0]}</Avatar>
            <Typography>{name}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Friend Requests & All Chats modals */}
      <FriendRequests open={openFriend} onClose={() => setOpenFriend(false)} />
      <AllChats open={openChats} onClose={() => setOpenChats(false)} />
    </Box>
  );
}