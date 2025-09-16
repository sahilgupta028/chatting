"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
