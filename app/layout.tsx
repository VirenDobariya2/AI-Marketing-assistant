import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LeadNest - AI-Powered Contact Marketing Assistant",
  description:
    "Streamline your lead generation and campaigns with intelligent automation.",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AuthProvider> */}
            {children}
            <Toaster />
          {/* </AuthProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}



