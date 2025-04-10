import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "./providers/QueryProvider";
import { SessionProviders } from "./providers/session-provider";
import "./styles/globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <SessionProviders>
          <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </QueryProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
