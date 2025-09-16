"use client";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";

const navItems = ["Home", "Features", "Pricing", "About"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ChatX
      </Typography>
      <List>
        {navItems.map((item) => (
          <Box key={item}>
            <ListItemText primary={item} />
          </Box>
        ))}
        <ListItem>
          <Button fullWidth variant="contained" sx={{ my: 1 }}>
            Login
          </Button>
        </ListItem>
        <ListItem>
          <Button fullWidth variant="outlined">
            Sign Up
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          {/* Logo */}
          <ChatIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            ChatX
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff", mx: 1 }}>
                {item}
              </Button>
            ))}
            <Button variant="contained" sx={{ ml: 2, bgcolor: "white", color: "#1976d2", fontWeight: "bold" }}>
              Login
            </Button>
            <Button variant="outlined" sx={{ ml: 1, borderColor: "white", color: "white" }}>
              Sign Up
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: "none" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}