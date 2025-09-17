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
  IconButton,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface FriendRequestsProps {
  open: boolean;
  onClose: () => void;
  requests?: string[];
}

export default function FriendRequests({
  open,
  onClose,
  requests = ["Alice wants to connect", "Bob sent a request", "Charlie wants to connect"],
}: FriendRequestsProps) {
  const [friendList, setFriendList] = useState(requests);

  const handleAccept = (index: number) => {
    // Remove request from list on accept
    const updated = friendList.filter((_, i) => i !== index);
    setFriendList(updated);
    alert(`Accepted friend request!`);
  };

  const handleReject = (index: number) => {
    const updated = friendList.filter((_, i) => i !== index);
    setFriendList(updated);
    alert(`Rejected friend request.`);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          Friend Requests
        </Typography>
      </DialogTitle>
      <DialogContent>
        {friendList.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" mt={2}>
            No pending requests 🎉
          </Typography>
        ) : (
          <List>
            {friendList.map((req, i) => (
              <ListItem key={i} sx={{ mb: 1, p: 0 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderRadius: 2,
                    transition: "0.2s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>{req[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={req} />
                  </Stack>

                  <Stack direction="row" spacing={0.5}>
                    <IconButton
                      color="success"
                      size="small"
                      onClick={() => handleAccept(i)}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleReject(i)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}