import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import { UsersProvider } from "./context/UsersContext";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DRPG - 2025",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <CssBaseline />
        <UsersProvider>
          <Navigation>{children}</Navigation>
        </UsersProvider>
      </body>
    </html>
  );
}
