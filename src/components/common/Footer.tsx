"use client";

import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2",
        color: "white",
        mt: 6,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <ChatIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h6" fontWeight="bold">
                ChatX
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              A modern, secure, and lightning-fast chat platform built with
              Next.js & Material UI.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, cursor: "pointer" }}>
              Home
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, cursor: "pointer" }}>
              Features
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, cursor: "pointer" }}>
              Pricing
            </Typography>
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              About
            </Typography>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Follow Us
            </Typography>
            <Box>
              <IconButton sx={{ color: "white" }}>
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <TwitterIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            textAlign: "center",
            mt: 4,
            pt: 3,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} ChatX. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}