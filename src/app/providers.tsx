"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

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
  const pathname = usePathname();
  const hideLayout =
    pathname?.startsWith("/chat");
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" reverseOrder={false} />
      <SessionProvider>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      </SessionProvider>
    </ThemeProvider>
  );
}
